// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// Services
import { TwoFactorAuthenticationService } from './2fa.service';
// Entities
import { TwoFactorAuthentication } from './entities/2fa.entity';
import { CurrentUserId } from 'src/auth/decorators/current-userid.decorator';
import { ForbiddenException } from '@nestjs/common';

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
}
