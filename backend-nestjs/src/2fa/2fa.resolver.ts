// Dependencies
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// Services
import { TwoFactorAuthenticationService } from './2fa.service';
// Entities
import { TwoFactorAuthentication } from './entities/2fa.entity';
// DTOs
import { AuthResponse } from 'src/auth/dtos/auth.response';
import { LoginTwoFactorAuthenticationInput } from './dtos/login-2fa.input';
// Decorators
import { CurrentUserId } from 'src/auth/decorators/current-userid.decorator';
// Guards
import { ShortLivedTokenGuard } from 'src/auth/guards/short-lived-token.guard';

/**
 * The two-factor authentication resolver that encapsulates all two-factor authentication-related GraphQL queries,
 * mutations, and subscriptions.
 *
 * @export
 * @class TwoFactorAuthenticationResolver
 * @module TwoFactorAuthenticationModule
 */
@Resolver()
export class TwoFactorAuthenticationResolver {
  /**
   * Creates an instance of the TwoFactorAuthenticationResolver class.
   *
   * @param {TwoFactorAuthenticationService} twoFactorAuthenticationService - The TwoFactorAuthenticationService instance for handling two-factor authentication operations.
   */
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}

  /**
   * Logs in a user with two-factor authentication.
   *
   * @mutation
   * @param {LoginTwoFactorAuthenticationInput} loginTwoFactorAuthenticationInput - The login two-factor authentication input.
   * @returns {Promise<AuthResponse>} - The authentication response.
   */
  @UseGuards(ShortLivedTokenGuard)
  @Mutation(() => AuthResponse, {
    name: 'loginTwoFactorAuthentication',
    description: 'Logs in a user with two-factor authentication.',
  })
  public async loginTwoFactorAuthentication(
    @Args('loginTwoFactorAuthenticationInput')
    loginTwoFactorAuthenticationInput: LoginTwoFactorAuthenticationInput,
  ): Promise<AuthResponse> {
    return this.twoFactorAuthenticationService.loginTwoFactorAuthentication(
      loginTwoFactorAuthenticationInput,
    );
  }

  /**
   * Generates a two-factor authentication secret and OTP authentication URI for the current user.
   *
   * @mutation
   * @param {string} id - The ID of the current user.
   * @param {string} userId - The ID of the user to generate the two-factor authentication secret.
   * @param {string} username - The username of the user to generate the two-factor authentication secret.
   * @returns {Promise<TwoFactorAuthentication>} - The result of the two-factor authentication secret generation operation.
   * @throws {ForbiddenException} - If the current user is not authorized to generate a two-factor authentication secret for another user.
   */
  @Mutation(() => TwoFactorAuthentication, {
    name: 'generateTwoFactorAuthenticationSecret',
    description:
      'Generates a two-factor authentication secret and OTP authentication URI for a user.',
  })
  public async generateTwoFactorAuthenticationSecret(
    @CurrentUserId() id: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('username', { type: () => String }) username: string,
  ): Promise<TwoFactorAuthentication> {
    if (id !== userId)
      throw new ForbiddenException(
        'You are not authorized to generate a two-factor authentication secret for another user',
      );

    const { otpAuthUri } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        userId,
        username,
      );

    return {
      status: 'Two-factor authentication secret generated successfully',
      otpAuthUri:
        await this.twoFactorAuthenticationService.generateQrCodeDataUri(
          otpAuthUri,
        ),
    };
  }

  /**
   * Enables two-factor authentication for the current user.
   *
   * @mutation
   * @param {string} id - The ID of the current user.
   * @param {string} userId - The ID of the user to enable two-factor authentication.
   * @param {string} otp - The one-time password to verify the two-factor authentication.
   * @returns {Promise<TwoFactorAuthentication>} - The result of the two-factor authentication enabling operation.
   * @throws {ForbiddenException} - If the current user is not authorized to enable two-factor authentication for another user.
   * @throws {ForbiddenException} - If the one-time password is invalid.
   */
  @Mutation(() => TwoFactorAuthentication, {
    name: 'enableTwoFactorAuthentication',
    description: 'Enables two-factor authentication for the current user.',
  })
  public async enableTwoFactorAuthentication(
    @CurrentUserId() id: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('otp', { type: () => String }) otp: string,
  ): Promise<TwoFactorAuthentication> {
    if (id !== userId)
      throw new ForbiddenException(
        'You are not authorized to enable two-factor authentication for another user',
      );

    const isOneTimePasswordValid: boolean =
      await this.twoFactorAuthenticationService.verifyTwoFactorAuthentication(
        userId,
        otp,
      );

    if (!isOneTimePasswordValid)
      throw new ForbiddenException('Wrong one-time password');

    return {
      status: 'Two-factor authentication enabled successfully',
      connection:
        await this.twoFactorAuthenticationService.turnOnTwoFactorAuthentication(
          userId,
        ),
    };
  }

  /**
   * Disables two-factor authentication for the current user.
   *
   * @mutation
   * @param {string} id - The ID of the current user.
   * @param {string} userId - The ID of the user to disable two-factor authentication.
   * @param {string} otp - The one-time password to verify the two-factor authentication.
   * @returns {Promise<TwoFactorAuthentication>} - The result of the two-factor authentication disabling operation.
   * @throws {ForbiddenException} - If the current user is not authorized to disable two-factor authentication for another user.
   * @throws {ForbiddenException} - If the one-time password is invalid.
   */
  @Mutation(() => TwoFactorAuthentication, {
    name: 'disableTwoFactorAuthentication',
    description: 'Disables two-factor authentication for the current user.',
  })
  public async disableTwoFactorAuthentication(
    @CurrentUserId() id: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('otp', { type: () => String }) otp: string,
  ): Promise<TwoFactorAuthentication> {
    if (id !== userId)
      throw new ForbiddenException(
        'You are not authorized to disable two-factor authentication for another user',
      );

    const isOneTimePasswordValid: boolean =
      await this.twoFactorAuthenticationService.verifyTwoFactorAuthentication(
        userId,
        otp,
      );

    if (!isOneTimePasswordValid)
      throw new ForbiddenException('Wrong one-time password');

    return {
      status: 'Two-factor authentication disabled successfully',
      connection:
        await this.twoFactorAuthenticationService.turnOffTwoFactorAuthentication(
          userId,
        ),
    };
  }

  /**
   * Verifies a two-factor authentication one-time password.
   *
   * @mutation
   * @param {string} id - The ID of the current user.
   * @param {string} userId - The ID of the user.
   * @param {string} otp - The one-time password to verify.
   * @returns {Promise<boolean>} - The result of the two-factor authentication verification operation.
   * @throws {ForbiddenException} - If the current user is not authorized to verify two-factor authentication for another user.
   */
  @Mutation(() => TwoFactorAuthentication, {
    name: 'verifyTwoFactorAuthentication',
    description: 'Verifies a two-factor authentication one-time password.',
  })
  public async verifyTwoFactorAuthentication(
    @CurrentUserId() id: string,
    @Args('userId', { type: () => String }) userId: string,
    @Args('otp', { type: () => String }) otp: string,
  ): Promise<TwoFactorAuthentication> {
    if (id !== userId)
      throw new ForbiddenException(
        'You are not authorized to verify two-factor authentication for another user',
      );

    const isOneTimePasswordValid: boolean =
      await this.twoFactorAuthenticationService.verifyTwoFactorAuthentication(
        userId,
        otp,
      );

    return {
      status: isOneTimePasswordValid
        ? 'Two-factor authentication verified successfully'
        : 'Two-factor authentication verification failed',
      is2faValid: isOneTimePasswordValid,
    };
  }
}
