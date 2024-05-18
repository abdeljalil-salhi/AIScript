// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type for the change password action.
 *
 * @export
 * @class ChangePasswordInput
 * @module AuthModule
 */
@InputType()
export class ChangePasswordInput {
  /**
   * ID of the user requesting the password change.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Change password user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the user requesting the password change',
  })
  public userId: string;

  /**
   * Old password of the user.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Change password old password must not be empty' })
  @IsString({ message: 'Change password old password must be a string' })
  @Field(() => String, {
    description: 'Old password of the user',
  })
  public oldPassword: string;

  /**
   * New password for the user.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Change password new password must not be empty' })
  @IsString({ message: 'Change password new password must be a string' })
  @Field(() => String, {
    description: 'New password for the user',
  })
  public newPassword: string;

  /**
   * Confirm password for the user.
   * @type {string}
   */
  @IsNotEmpty({ message: 'Change password confirm password must not be empty' })
  @IsString({ message: 'Change password confirm password must be a string' })
  @Field(() => String, {
    description: 'Confirm password for the user',
  })
  public confirmPassword: string;
}
