// Dependencies
import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Represents the response after a user's authentication operation.
 *
 * @export
 * @class AuthResponse
 * @module AuthModule
 */
@ObjectType()
export class AuthResponse {
  /**
   * A short lived token that can be used to verify two-factor authentication.
   * @type {string}
   * @nullable
   */
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'Short lived token must not be empty' })
  @IsString({ message: 'Short lived token must be a string' })
  @Field(() => String, {
    description: 'Short lived token of the user',
    nullable: true,
  })
  public shortLivedToken?: string;

  /**
   * A Json Web Token (JWT) that contains the user's details.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Access token must not be empty' })
  @IsString({ message: 'Access token must be a string' })
  @Field(() => String, { description: 'Access token of the user' })
  public accessToken: string;

  /**
   * A token that can be used to refresh the access token.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Refresh token must not be empty' })
  @IsString({ message: 'Refresh token must be a string' })
  @Field(() => String, { description: 'Refresh token of the user' })
  public refreshToken: string;

  /**
   * The user's details.
   * @type {User}
   */
  @IsNotEmpty({ message: 'User details must not be empty' })
  @Field(() => User, { description: 'User details' })
  public user: User;

  /**
   * Whether two-factor authentication is enabled.
   * @type {boolean}
   */
  @IsNotEmpty({ message: 'Is 2FA enabled must not be empty' })
  @IsBoolean({ message: 'Is 2FA enabled must be a boolean' })
  @Field(() => Boolean, { description: 'Whether 2FA is enabled' })
  public is2faEnabled: boolean;
}
