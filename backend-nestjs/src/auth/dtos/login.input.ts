// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * The input type for the `login` mutation.
 * This is used as input to the `login` mutation.
 *
 * @export
 * @class LoginInput
 * @module AuthModule
 */
@InputType()
export class LoginInput {
  /**
   * Username or email of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Username or email must not be empty' })
  @IsString({ message: 'Username or email must be a string' })
  @Field(() => String, { description: 'Username or email of the user' })
  public usernameOrEmail: string;

  /**
   * Password of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Password must not be empty' })
  @IsString({ message: 'Password must be a string' })
  @Field(() => String, { description: 'Password of the user' })
  public password: string;
}
