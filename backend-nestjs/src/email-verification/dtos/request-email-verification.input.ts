// Dependencies
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to request email verification;
 * This is used as input to the `requestEmailVerification` mutation.
 *
 * @export
 * @class RequestEmailVerificationInput
 * @module EmailVerificationModule
 */
@InputType()
export class RequestEmailVerificationInput {
  /**
   * ID of the user requesting the email verification
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request email verification user ID must not be empty',
  })
  @Field(() => String, {
    description: 'ID of the user requesting the email verification',
  })
  public userId: string;

  /**
   * ID of the connection requesting the email verification
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request email verification connection ID must not be empty',
  })
  @Field(() => String, {
    description: 'ID of the connection requesting the email verification',
  })
  public connectionId: string;

  /**
   * Email of the user requesting the email verification
   * @type {string}
   */
  @IsNotEmpty({
    message: 'Request email verification email must not be empty',
  })
  @IsEmail(
    {},
    { message: 'Request email verification email must be a valid email' },
  )
  @Field(() => String, {
    description: 'Email of the user requesting the email verification',
  })
  public email: string;
}
