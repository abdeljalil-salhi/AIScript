// Dependencies
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to request a password reset;
 * This is used as input to the `requestForgotPassword` mutation.
 *
 * @export
 * @class RequestForgotPasswordInput
 * @module ForgotPasswordModule
 */
@InputType()
export class RequestForgotPasswordInput {
  /**
   * ID of the user requesting the password reset
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request forgot password user ID must not be empty',
  })
  @Field(() => String, {
    description: 'ID of the user requesting the password reset',
  })
  public userId: string;

  /**
   * ID of the connection requesting the password reset
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request forgot password connection ID must not be empty',
  })
  @Field(() => String, {
    description: 'ID of the connection requesting the password reset',
  })
  public connectionId: string;

  /**
   * Email of the user requesting the password reset
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request forgot password email must not be empty',
  })
  @IsEmail(
    {},
    { message: 'Request forgot password email must be a valid email' },
  )
  @Field(() => String, {
    description: 'Email of the user requesting the password reset',
  })
  public email: string;
}
