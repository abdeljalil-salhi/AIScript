// Dependencies
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * The input type for the `register` mutation.
 * This is used as input to the `register` mutation.
 *
 * @export
 * @class RegisterInput
 * @module AuthModule
 */
@InputType()
export class RegisterInput {
  /**
   * Username of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Register username must not be empty' })
  @IsString({ message: 'Register username must be a string' })
  @Field(() => String, { description: 'Username of the user' })
  public username: string;

  /**
   * Email of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Register email must not be empty' })
  @IsEmail({}, { message: 'Register email must be a valid email' })
  @Field(() => String, { description: 'Email of the user' })
  public email: string;

  /**
   * Filename of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'New user avatar filename must not be empty' })
  @IsString({ message: 'New user avatar filename must be a string' })
  @Field(() => String, { description: 'Filename of the avatar' })
  public filename: string;

  /**
   * Password of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Register password must not be empty' })
  @IsString({ message: 'Register password must be a string' })
  @Field(() => String, { description: 'Password of the user' })
  public password: string;
}
