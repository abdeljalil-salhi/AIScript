// Dependencies
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Services
import { AuthService } from './auth.service';
// DTOs
import { AuthResponse } from './dtos/auth.response';
import { LoginInput } from './dtos/login.input';
import { LogoutResponse } from './dtos/logout.response';
import { MeResponse } from './dtos/me.response';
import { NewTokensResponse } from './dtos/new-tokens.response';
import { RegisterInput } from './dtos/register.input';
// Decorators
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserId } from './decorators/current-userid.decorator';
import { Public } from './decorators/public.decorator';
// Guards
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ChangePasswordInput } from './dtos/change-password.input';

/**
 * The authentication resolver that encapsulates all authentication-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class AuthResolver
 * @module AuthModule
 */
@Resolver()
export class AuthResolver {
  /**
   * Creates an instance of the AuthResolver class.
   *
   * @param {AuthService} authService - The AuthService instance for handling authentication operations.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user with the specified details.
   *
   * @public
   * @mutation
   * @param {RegisterInput} registerInput - The input details for the user to register.
   * @returns {Promise<AuthResponse>} - The result of the registration operation.
   */
  @Public()
  @Mutation(() => AuthResponse, {
    name: 'register',
    description: 'Registers a new user with the specified details.',
  })
  public async register(
    @Args('registerInput') registerInput: RegisterInput,
  ): Promise<AuthResponse> {
    // Delegate the registration operation to the Authentication Service
    return this.authService.register(registerInput);
  }

  /**
   * Logs in a user with the specified details.
   *
   * @public
   * @mutation
   * @param {LoginInput} loginInput - The input details for the user to log in.
   * @returns {Promise<AuthResponse>} - The result of the login operation.
   */
  @Public()
  @Mutation(() => AuthResponse, {
    name: 'login',
    description: 'Logs in a user with the specified details.',
  })
  public async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    // Delegate the login operation to the Authentication Service
    return this.authService.login(loginInput);
  }

  /**
   * Logs out a user with the specified user ID.
   *
   * @mutation
   * @param {string} userId - The ID of the user to log out.
   * @returns {Promise<LogoutResponse>} - The result of the logout operation.
   */
  @Mutation(() => LogoutResponse, {
    name: 'logout',
    description: 'Logs out a user with the specified user ID.',
  })
  public async logout(
    @CurrentUserId() userId: string,
  ): Promise<LogoutResponse> {
    // Invalidate refresh tokens and log the user out
    return this.authService.logout(userId);
  }

  /**
   * Returns the currently authenticated user.
   *
   * @param {string} userId - The ID of the current user.
   * @returns {Promise<MeResponse>} - The currently authenticated user.
   */
  @Query(() => MeResponse, {
    name: 'me',
    description: 'Returns the currently authenticated user.',
  })
  public async me(@CurrentUserId() userId: string): Promise<MeResponse> {
    return this.authService.me(userId);
  }

  /**
   * Mutation resolver that changes the password of the current user.
   *
   * @public
   * @mutation
   * @param {string} userId - ID of the current user.
   * @param {ChangePasswordInput} changePasswordInput - Input data for changing the password.
   * @returns {Promise<string>} - The result of the password change operation.
   * @throws {ForbiddenException} - Thrown if the authenticated user is trying to change another user's password.
   */
  @Mutation(() => String, {
    name: 'changePassword',
    description: 'Changes the password of the current user.',
  })
  public async changePassword(
    @CurrentUserId() userId: string,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ): Promise<string> {
    if (changePasswordInput.userId !== userId)
      throw new ForbiddenException('You can only change your own password');

    return this.authService.changePassword(changePasswordInput);
  }

  /**
   * Mutation resolver that generates new access and refresh tokens for a user.
   *
   * @public
   * @use RefreshTokenGuard
   * @param {number} userId - ID of the current user.
   * @param {string} refreshToken - Refresh token of the current user.
   * @returns {Promise<NewTokensResponse>} - Response containing new access and refresh tokens.
   */
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => NewTokensResponse, {
    name: 'refresh',
    description: 'Generates new access and refresh tokens for a user.',
  })
  public async refresh(
    @CurrentUserId() userId: string,
    @CurrentUser('refreshToken') refreshToken: string,
  ): Promise<NewTokensResponse> {
    // Generate new access and refresh tokens for the user
    return this.authService.getNewTokens(userId, refreshToken);
  }
}
