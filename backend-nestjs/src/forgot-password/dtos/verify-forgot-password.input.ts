// Dependencies
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to verify a password reset;
 * This is used as input to the `verifyForgotPassword` mutation.
 *
 * @export
 * @class VerifyForgotPasswordInput
 * @module ForgotPasswordModule
 */
@InputType()
export class VerifyForgotPasswordInput {
  /**
   * Email of the user changing the password
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Forgot password DTO email must not be empty',
  })
  @IsEmail({}, { message: 'Forgot password DTO email must be a valid email' })
  @Field(() => String, {
    description: 'Email of the user changing the password',
  })
  public email: string;

  /**
   * Token for the forgot password reset
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Forgot password DTO token must not be empty',
  })
  @IsString({
    message: 'Forgot password DTO token must be a string',
  })
  @Field(() => String, {
    description: 'Token for the forgot password reset',
  })
  public token: string;

  /**
   * New password for the user
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Forgot password DTO password must not be empty',
  })
  @IsString({
    message: 'Forgot password DTO password must be a string',
  })
  @Field(() => String, {
    description: 'New password for the user',
  })
  public password: string;

  /**
   * New password confirmation for the user
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Forgot password DTO confirm password must not be empty',
  })
  @IsString({
    message: 'Forgot password DTO confirm password must be a string',
  })
  @Field(() => String, {
    description: 'New password confirmation for the user',
  })
  public confirmPassword: string;
}
