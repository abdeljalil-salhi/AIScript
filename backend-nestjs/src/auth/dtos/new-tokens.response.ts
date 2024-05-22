// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents the response containing new access and refresh tokens.
 *
 * This response includes the access token and refresh token
 * generated during the token renewal process.
 *
 * @export
 * @class NewTokensResponse
 * @module AuthModule
 */
@ObjectType()
export class NewTokensResponse {
  /**
   * The JSON Web Token (JWT) access token used for authorization and access.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Access token is required' })
  @IsString({ message: 'Access token must be a string' })
  @Field(() => String, {
    description:
      'JSON Web Token (JWT) access token used for authorization and access',
  })
  public accessToken: string;

  /**
   * The token for refreshing the JSON Web Token (JWT) access token when it expires.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString({ message: 'Refresh token must be a string' })
  @Field(() => String, {
    description:
      'Token for refreshing the JSON Web Token (JWT) access token when it expires',
  })
  public refreshToken: string;
}
