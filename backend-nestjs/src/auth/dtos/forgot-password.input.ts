// Dependencies
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type for the forgot password action.
 *
 * @export
 * @class ForgotPasswordInput
 * @module AuthModule
 */
@InputType()
export class ForgotPasswordInput {
  /**
   * Email of the user requesting the password reset.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password email must not be empty' })
  @IsEmail({}, { message: 'Forgot password email must be a valid email' })
  @Field(() => String, {
    description: 'Email of the user requesting the password reset',
  })
  public email: string;

  /**
   * New password for the user.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password new password must not be empty' })
  @IsString({ message: 'Forgot password new password must be a string' })
  @Field(() => String, {
    description: 'New password for the user',
  })
  public password: string;

  /**
   * Confirm password for the user.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password confirm password must not be empty' })
  @IsString({ message: 'Forgot password confirm password must be a string' })
  @Field(() => String, {
    description: 'Confirm password for the user',
  })
  public confirmPassword: string;
}
