// Dependencies
import * as argon from 'argon2';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Services
import { UserService } from 'src/user/user.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
// Entities
import { User } from 'src/user/entities/user.entity';
import { EmailVerification } from 'src/email-verification/entities/email-verification.entity';
// DTOs
import { AuthResponse } from './dtos/auth.response';
import { LoginInput } from './dtos/login.input';
import { LogoutResponse } from './dtos/logout.response';
import { MeResponse } from './dtos/me.response';
import { NewTokensResponse } from './dtos/new-tokens.response';
import { RegisterInput } from './dtos/register.input';
import { ForgotPasswordInput } from './dtos/forgot-password.input';
import { ChangePasswordInput } from './dtos/change-password.input';
import { ShortLivedTokenResponse } from './dtos/short-lived-token.response';

/**
 * The authentication service that encapsulates all authentication-related features and functionalities.
 *
 * @export
 * @class AuthService
 * @module AuthModule
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of the AuthService class.
   *
   * @param {JwtService} jwtService - The service for creating and verifying JSON Web Tokens (JWTs).
   * @param {UserService} userService - The user service for user-related operations.
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  /**
   * Registers a new user with the specified details.
   *
   * @param {RegisterInput} registerInput - The input details for the user to register.
   * @returns {Promise<AuthResponse>} - The result of the registration operation.
   * @throws {ConflictException} - Thrown if the username already exists.
   * @throws {NotFoundException} - Thrown if the email verification is not created.
   */
  public async register(registerInput: RegisterInput): Promise<AuthResponse> {
    /**
     * Check if the username already exists.
     * If it does, throw a ConflictException.
     * If it doesn't, continue with the registration process.
     */
    await this.userService
      .findByUsernameOrEmail(registerInput.username)
      .then(() => {
        throw new ConflictException('Username already exists');
      })
      .catch(() => {});

    /**
     * Hash the password of the user.
     * This is done to ensure that the password is not stored in plain text.
     * The hashed password is then used to create the user.
     */
    const hashedPassword: string = await this.userService.hashPassword(
      registerInput.password,
    );

    /**
     * Create the user with the specified details,
     * Using the `newUserInput` DTO.
     */
    const user: User = await this.userService.createUser({
      username: registerInput.username,
      avatar: {
        filename: registerInput.filename,
      },
      connection: {
        email: registerInput.email,
        password: hashedPassword,
        provider: 'local',
      },
    });

    /**
     * Create tokens and update refresh token in the database.
     * This is done to ensure that the user is authenticated and authorized.
     */
    const { accessToken, refreshToken } = await this.createTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);

    /**
     * Create an email verification for the user.
     * Send an email to the user to verify their email address.
     * This is done to ensure that the user owns the email address.
     */
    const emailVerification: EmailVerification =
      await this.emailVerificationService.createEmailVerification(
        user.connection.id,
        user.connection.email,
      );

    if (!emailVerification)
      throw new NotFoundException('Email verification not created');

    // Return the authentication response with the access token and refresh token
    return {
      accessToken,
      refreshToken,
      user,
      is2faEnabled: user.connection.is2faEnabled,
    };
  }

  /**
   * Logs in the user with the specified details.
   *
   * @param {LoginInput} loginInput - The input details for the user to login.
   * @returns {Promise<AuthResponse>} - The result of the login operation.
   * @throws {NotFoundException} - Thrown if the user is not found.
   * @throws {ForbiddenException} - Thrown if the password is invalid.
   */
  public async login(loginInput: LoginInput): Promise<AuthResponse> {
    /**
     * Find the user with the specified username or email.
     * If the user is not found, throw a NotFoundException.
     * If the user is found, continue with the login process.
     */
    const user: User = await this.userService
      .findByUsernameOrEmail(loginInput.usernameOrEmail)
      .then((user: User) => {
        if (!user) throw new NotFoundException('User not found');
        return user;
      });

    /**
     * Verify the password of the user.
     * If the password is invalid, throw a ForbiddenException.
     * If the password is valid, continue with the login process.
     */
    await argon
      .verify(user.connection.password, loginInput.password)
      .then((isPasswordValid: boolean) => {
        if (!isPasswordValid)
          throw new ForbiddenException('Invalid credentials');
      });

    /**
     * If the user has two-factor authentication enabled, create a short-lived token for the user.
     * This is done to ensure that the user is authenticated and authorized to access the two-factor
     * authentication (2FA) verification page.
     */
    if (user.connection.is2faEnabled) {
      // Create a short-lived token for the user
      const { shortLivedToken } = await this.createShortLivedToken(user);

      // Return the short-lived token for the user to perform 2FA verification
      return {
        shortLivedToken,
        accessToken: '',
        refreshToken: '',
        user,
        is2faEnabled: user.connection.is2faEnabled,
      };
    }

    /**
     * Create tokens and update refresh token in the database.
     * This is done to ensure that the user is authenticated and authorized.
     */
    const { accessToken, refreshToken } = await this.createTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);

    // Return the authentication response with the access token and refresh token
    return {
      accessToken,
      refreshToken,
      user,
      is2faEnabled: user.connection.is2faEnabled,
    };
  }

  /**
   * Logs out the user with the specified ID.
   *
   * @param {string} userId - The ID of the user to logout.
   * @returns {Promise<LogoutResponse>} - The result of the logout operation.
   * @throws {ForbiddenException} - Thrown if the user is not found or already logged out.
   */
  public async logout(userId: string): Promise<LogoutResponse> {
    /**
     * Update the refresh token for the user in the database to null.
     * This is done to ensure that the user is logged out.
     * If the user is not found or the refresh token is already null, throw a ForbiddenException.
     * If the user is found and the refresh token is updated, continue with the logout process.
     */
    const result: User = await this.userService.updateRefreshToken(userId, '');
    if (!result)
      throw new ForbiddenException(
        'Invalid credentials or user already logged out',
      );

    // Return response indicating that the user has been logged out successfully
    return {
      isLoggedOut: true,
    };
  }

  /**
   * Returns the currently authenticated user.
   *
   * @param {string} userId - The ID of the current user.
   * @returns {Promise<MeResponse>} - The currently authenticated user.
   * @throws {NotFoundException} - Thrown if the user is not found.
   * @throws {ForbiddenException} - Thrown if the user is not logged in.
   */
  public async me(userId: string): Promise<MeResponse> {
    /**
     * Find the user with the specified ID.
     * If the user is not found, throw a NotFoundException.
     * Otherwise, continue with the user details retrieval process.
     */
    const user: User = await this.userService
      .findById(userId)
      .then((user: User) => {
        if (!user) throw new NotFoundException('User not found');
        return user;
      });

    // If the user does not have a refresh token, invalidate the user's session
    // It means the user is not logged in
    if (!user.refreshToken) throw new ForbiddenException('Session logged out');

    // Return the user details
    return {
      user,
    };
  }

  /**
   * Verifies the password of the user with the specified ID.
   *
   * @param {string} userId - The ID of the user to verify the password for.
   * @param {string} password - The password to verify.
   * @returns {Promise<boolean>} - The result of the password verification operation.
   * @throws {NotFoundException} - Thrown if the user is not found.
   */
  public async verifyPassword(
    userId: string,
    password: string,
  ): Promise<boolean> {
    /**
     * Verify the password of the user.
     * Checks whether the password is valid or not.
     */
    return this.userService.findById(userId).then((user: User) => {
      if (!user) throw new NotFoundException('User not found');
      return argon.verify(user.connection.password, password);
    });
  }

  /**
   * Changes the password for the user with the specified ID.
   *
   * @param {ChangePasswordInput} changePasswordInput - The input details for the user to change the password.
   * @returns {Promise<string>} - The result of the password change operation.
   * @throws {NotFoundException} - Thrown if the user is not found.
   * @throws {ForbiddenException} - Thrown if the passwords do not match.
   */
  public async changePassword(
    changePasswordInput: ChangePasswordInput,
  ): Promise<string> {
    /**
     * Verify the old password of the user.
     * If the old password is invalid, throw a ForbiddenException.
     * If the old password is valid, continue with the password change process.
     */
    await this.userService
      .findById(changePasswordInput.userId)
      .then((user: User) => {
        if (!user) throw new NotFoundException('User not found');
        return argon.verify(
          user.connection.password,
          changePasswordInput.oldPassword,
        );
      })
      .then((isPasswordValid: boolean) => {
        if (!isPasswordValid)
          throw new ForbiddenException('Invalid old password');
      });

    /**
     * Check if the new password and confirm password match.
     * If they do not match, throw a ForbiddenException.
     * If they match, continue with the password change process.
     */
    if (changePasswordInput.newPassword !== changePasswordInput.confirmPassword)
      throw new ForbiddenException('Passwords do not match');

    /**
     * Hash the new password of the user.
     * This is done to ensure that the password is not stored in plain text.
     * The hashed password is then used to update the user's password.
     */
    const hashedPassword: string = await this.userService.hashPassword(
      changePasswordInput.newPassword,
    );

    // Change the user's password with the new hashed password.
    await this.userService.updatePassword(
      changePasswordInput.userId,
      hashedPassword,
    );

    // Return a success message indicating that the password has been changed successfully
    return 'Password changed successfully';
  }

  /**
   * Resets the password for the user with the specified email.
   *
   * @param {ForgotPasswordInput} forgotPasswordInput - The input details for the user to reset the password.
   * @returns {Promise<AuthResponse>} - The result of the password reset operation.
   * @throws {NotFoundException} - Thrown if the user is not found.
   * @throws {ForbiddenException} - Thrown if the passwords do not match.
   */
  public async forgotPassword(
    forgotPasswordInput: ForgotPasswordInput,
  ): Promise<AuthResponse> {
    /**
     * Find the user by the specified email.
     * If the user is not found, throw a NotFoundException.
     * Otherwise, continue with the forgot password process.
     */
    const userId: string = await this.userService
      .findByUsernameOrEmail(forgotPasswordInput.email)
      .then((user: User) => {
        if (!user) throw new NotFoundException('User not found');
        return user.id;
      });

    /**
     * Check if the new password and confirm password match.
     * If they do not match, throw a ForbiddenException.\
     */
    if (forgotPasswordInput.password !== forgotPasswordInput.confirmPassword)
      throw new ForbiddenException('Passwords do not match');

    /**
     * Hash the new password of the user.
     * This is done to ensure that the password is not stored in plain text.
     * The hashed password is then used to update the user's password.
     */
    const hashedPassword: string = await this.userService.hashPassword(
      forgotPasswordInput.password,
    );

    // Change the user's password with the new hashed password.
    const user: User = await this.userService.updatePassword(
      userId,
      hashedPassword,
    );

    /**
     * Create tokens and update refresh token in the database.
     * This is done to ensure that the user is authenticated and authorized.
     */
    const { accessToken, refreshToken } = await this.createTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);

    // Return the authentication response with the access token and refresh token
    return {
      accessToken,
      refreshToken,
      user,
      is2faEnabled: user.connection.is2faEnabled,
    };
  }

  /**
   * Creates a new short-lived token for the user to perform two-factor authentication
   * or other sensitive operations.
   *
   * @param {User} user - The user for whom to create a short-lived token.
   * @returns {Promise<ShortLivedTokenResponse>} - The short-lived token for the user.
   */
  public async createShortLivedToken(
    user: User,
  ): Promise<ShortLivedTokenResponse> {
    /**
     * Generate a new short-lived token for the user.
     */
    const shortLivedToken: string = this.jwtService.sign(
      {
        id: user.id,
        is2faEnabled: user.connection.is2faEnabled,
        isAdmin: user.isAdmin,
      },
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_SHORT_LIVED_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_SHORT_LIVED_TOKEN_SECRET,
      },
    );

    // Return the short-lived token
    return {
      shortLivedToken,
    };
  }

  /**
   * Creates new access and refresh tokens for the user.
   *
   * @param {User} user - The user for whom to create new tokens.
   * @param {boolean} [is2faAuthenticated=false] - Whether or not the user is authenticated with 2FA.
   * @returns {Promise<NewTokensResponse>} - The new tokens for the user.
   */
  public async createTokens(
    user: User,
    is2faAuthenticated: boolean = false,
  ): Promise<NewTokensResponse> {
    /**
     * Generate a new access token for the user.
     */
    const accessToken: string = this.jwtService.sign(
      {
        id: user.id,
        email: user.connection.email,
        isEmailVerified: user.connection.isEmailVerified,
        is2faEnabled: user.connection.is2faEnabled,
        is2faAuthenticated,
        isAdmin: user.isAdmin,
      },
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      },
    );

    /**
     * Generate a new refresh token for the user.
     * This is used to refresh the access token when it expires.
     */
    const refreshToken: string = this.jwtService.sign(
      {
        id: user.id,
        email: user.connection.email,
        isEmailVerified: user.connection.isEmailVerified,
        is2faEnabled: user.connection.is2faEnabled,
        isAdmin: user.isAdmin,
        accessToken,
      },
      {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      },
    );

    // Return the access token and refresh token
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Updates the refresh token for the user in the database.
   *
   * @param {string} userId - The ID of the user to update the refresh token for.
   * @param {string} refreshToken - The new refresh token for the user.
   * @returns {Promise<void>} - The result of the update operation.
   */
  public async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    // Hash the new refresh token before updating it in the database
    const hashedRefreshToken: string = await argon.hash(refreshToken);

    // Update the refresh token in the database
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  public async getNewTokens(
    userId: string,
    refreshToken: string,
  ): Promise<NewTokensResponse> {
    /**
     * Find the user with the specified ID.
     * If the user is not found, throw a ForbiddenException.
     * Otherwise, continue with the token refresh process.
     */
    const user: User = await this.userService
      .findById(userId)
      .then((user: User) => {
        if (!user) throw new ForbiddenException('Invalid user ID');
        return user;
      });

    /**
     * Verify the provided refresh token against the hashed refresh token in the database.
     * If the refresh token is invalid, throw a forbidden exception.
     * Otherwise, continue with the token refresh process.
     */
    await argon
      .verify(user.refreshToken, refreshToken)
      .then((isRefreshTokenValid: boolean) => {
        if (!isRefreshTokenValid)
          throw new ForbiddenException('Invalid refresh token');
      });

    // Create new tokens for the user
    const { accessToken, refreshToken: newRefreshToken } =
      await this.createTokens(user);

    // Update the refresh token in the database
    await this.updateRefreshToken(user.id, newRefreshToken);

    // Return the new access token and refresh token
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
