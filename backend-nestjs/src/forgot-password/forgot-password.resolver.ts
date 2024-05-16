// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

// Services
import { ForgotPasswordService } from './forgot-password.service';
// Entities
import { ForgotPassword } from './entities/forgot-password.entity';
// DTOs
import { RequestForgotPasswordInput } from './dtos/request-forgot-password.input';
// Decorators
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

/**
 * The resolver that contains all the forgot password-related GraphQL queries and mutations.
 *
 * @export
 * @class ForgotPasswordResolver
 * @module ForgotPasswordModule
 */
@Resolver()
export class ForgotPasswordResolver {
  /**
   * Creates an instance of ForgotPasswordResolver.
   *
   * @param {ForgotPasswordService} forgotPasswordService - The injected forgot password service.
   */
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  /**
   * Requests a forgot password token for the specified email.
   *
   * @mutation
   * @param {string} userId - The user ID requesting the forgot password token.
   * @param {RequestForgotPasswordInput} requestForgotPassword - The input data to request a forgot password token.
   * @returns {Promise<ForgotPassword>} - The created forgot password entity.
   * @throws {ForbiddenException} - Thrown if the authenticated user is trying to request a forgot password token for another user.
   */
  @Mutation(() => ForgotPassword, {
    name: 'requestForgotPassword',
    description: 'Requests a forgot password token for the specified email.',
  })
  public async requestForgotPassword(
    @CurrentUser('id') userId: string,
    @Args('requestForgotPasswordInput')
    requestForgotPassword: RequestForgotPasswordInput,
  ): Promise<ForgotPassword> {
    if (userId !== requestForgotPassword.userId)
      throw new ForbiddenException(
        'You can only request a forgot password token for your own account',
      );

    return this.forgotPasswordService.createForgotPassword(
      requestForgotPassword.connectionId,
      requestForgotPassword.email,
    );
  }
}
