// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthResponse {
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
}
