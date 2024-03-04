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
// Entities
import { User } from 'src/user/entities/user.entity';
// DTOs
import { AuthResponse } from './dtos/auth.response';
import { LoginInput } from './dtos/login.input';
import { LogoutResponse } from './dtos/logout.response';
import { NewTokensResponse } from './dtos/new-tokens.response';
import { RegisterInput } from './dtos/register.input';

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
  ) {}

  /**
   * Registers a new user with the specified details.
   *
   * @param {RegisterInput} registerInput - The input details for the user to register.
   * @returns {Promise<AuthResponse>} - The result of the registration operation.
   * @throws {ConflictException} - Thrown if the username already exists.
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
      });

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

    // Return the authentication response with the access token and refresh token
    return {
      accessToken,
      refreshToken,
      user,
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
   * Creates new access and refresh tokens for the user.
   *
   * @param {User} user - The user for whom to create new tokens.
   * @param {boolean} [is2faAuthenticated=false] - Whether or not the user is authenticated with 2FA.
   * @returns {Promise<NewTokensResponse>} - The new tokens for the user.
   */
  private async createTokens(
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
}
