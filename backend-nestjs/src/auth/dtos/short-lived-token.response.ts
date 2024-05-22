// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents the response containing a short-lived token.
 *
 * This response includes the short-lived token generated during the two-factor
 * authentication verification process.
 *
 * @export
 * @class ShortLivedTokenResponse
 * @module AuthModule
 */
@ObjectType()
export class ShortLivedTokenResponse {
  /**
   * The short-lived token that can be used to verify two-factor authentication.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Short lived token must not be empty' })
  @IsString({ message: 'Short lived token must be a string' })
  @Field(() => String, {
    description:
      'Short-lived token that can be used to verify two-factor authentication',
  })
  public shortLivedToken: string;
}
