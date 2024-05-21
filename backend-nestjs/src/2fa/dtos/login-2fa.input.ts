// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * The input type for the `loginTwoFactorAuthentication` mutation.
 * This is used as input to the `loginTwoFactorAuthentication` mutation.
 *
 * @export
 * @class LoginTwoFactorAuthenticationInput
 * @module TwoFactorAuthenticationModule
 */
@InputType()
export class LoginTwoFactorAuthenticationInput {
  /**
   * The ID of the user to log in with two-factor authentication
   * @type {string}
   */
  @IsNotEmpty({ message: 'User ID must not be empty' })
  @Field(() => String, {
    description: 'The ID of the user to log in with two-factor authentication',
  })
  public userId: string;

  /**
   * The two-factor authentication one-time password (OTP) entered by the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'One-time password must not be empty' })
  @IsString({ message: 'One-time password must be a string' })
  @Field(() => String, {
    description:
      'The two-factor authentication one-time password (OTP) entered by the user',
  })
  public otp: string;
}
