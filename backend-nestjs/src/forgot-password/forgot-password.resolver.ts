// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// Services
import { ForgotPasswordService } from './forgot-password.service';
// Entities
import { ForgotPassword } from './entities/forgot-password.entity';
// DTOs
import { RequestForgotPasswordInput } from './dtos/request-forgot-password.input';
import { VerifyForgotPasswordInput } from './dtos/verify-forgot-password.input';
import { AuthResponse } from 'src/auth/dtos/auth.response';
// Decorators
import { Public } from 'src/auth/decorators/public.decorator';

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
   * Sends an email to the user with a link to reset their password.
   *
   * @public
   * @mutation
   * @param {RequestForgotPasswordInput} requestForgotPasswordInput - The input data to request a forgot password token.
   * @returns {Promise<ForgotPassword>} - The created forgot password entity.
   * @throws {ForbiddenException} - Thrown if the authenticated user is trying to request a forgot password token for another user.
   */
  @Public()
  @Mutation(() => ForgotPassword, {
    name: 'requestForgotPassword',
    description: 'Requests a forgot password token for the specified email.',
  })
  public async requestForgotPassword(
    @Args('requestForgotPasswordInput')
    requestForgotPasswordInput: RequestForgotPasswordInput,
  ): Promise<ForgotPassword> {
    return this.forgotPasswordService.createForgotPassword(
      requestForgotPasswordInput,
    );
  }

  /**
   * Verifies the forgot password token and updates the user password.
   *
   * @public
   * @mutation
   * @param {VerifyForgotPasswordInput} verifyForgotPasswordInput - The input data to verify the forgot password token.
   * @returns {Promise<AuthResponse>} - The result of the forgot password operation.
   */
  @Public()
  @Mutation(() => AuthResponse, {
    name: 'forgotPassword',
    description:
      'Verifies the forgot password token and updates the user password.',
  })
  public async forgotPassword(
    @Args('verifyForgotPasswordInput')
    verifyForgotPasswordInput: VerifyForgotPasswordInput,
  ): Promise<AuthResponse> {
    // Delegate the forgot password operation to the ForgotPassword Service
    return this.forgotPasswordService.verifyForgotPassword(
      verifyForgotPasswordInput,
    );
  }
}
