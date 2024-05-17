// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ForbiddenException } from '@nestjs/common';

// Services
import { EmailVerificationService } from './email-verification.service';
// Entities
import { EmailVerification } from './entities/email-verification.entity';
// DTOs
import { RequestEmailVerificationInput } from './dtos/request-email-verification.input';
// Decorators
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

/**
 * The email verification resolver that contains all email verification-related GraphQL queries and mutations.
 *
 * @export
 * @class EmailVerificationResolver
 */
@Resolver()
export class EmailVerificationResolver {
  /**
   * Creates an instance of EmailVerificationResolver.
   *
   * @param {EmailVerificationService} emailVerificationService - The injected email verification service.
   */
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  /**
   * Requests an email verification for the specified email.
   * Sends an email to the user with a link to verify their email.
   *
   * @mutation
   * @param {string} userId - The user ID requesting the email verification.
   * @param {RequestEmailVerificationInput} requestEmailVerification - The input data to request an email verification.
   * @returns {Promise<EmailVerification>} - The created email verification entity.
   * @throws {ForbiddenException} - Thrown if the authenticated user is trying to request an email verification for another user.
   */
  @Mutation(() => EmailVerification, {
    name: 'requestEmailVerification',
    description: 'Requests an email verification for the specified email.',
  })
  public async requestEmailVerification(
    @CurrentUser('id') userId: string,
    @Args('requestEmailVerificationInput')
    requestEmailVerification: RequestEmailVerificationInput,
  ): Promise<EmailVerification> {
    if (userId !== requestEmailVerification.userId)
      throw new ForbiddenException(
        'You can only request email verification for your own account',
      );

    return this.emailVerificationService.createEmailVerification(
      requestEmailVerification.connectionId,
      requestEmailVerification.email,
    );
  }

  /**
   * Verifies the email verification with the specified token.
   *
   * @mutation
   * @param {string} email - The email to verify.
   * @param {string} token - The token to verify.
   * @returns {Promise<string>} - A message indicating the result of the email verification.
   * @throws {ForbiddenException} - Thrown if the user is not authenticated.
   */
  @Mutation(() => String, {
    name: 'verifyEmail',
    description: 'Verifies the email verification with the specified token.',
  })
  public async verifyEmail(
    @CurrentUser('email') email: string,
    @Args('token') token: string,
  ): Promise<string> {
    if (!email)
      throw new ForbiddenException(
        'You must be authenticated to verify your email.',
      );

    return this.emailVerificationService.verifyEmailVerification(email, token);
  }
}
