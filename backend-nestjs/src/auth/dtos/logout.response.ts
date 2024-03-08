// Dependencies
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents the response after a user's logout operation.
 *
 * @export
 * @class LogoutResponse
 * @module AuthModule
 */
@ObjectType()
export class LogoutResponse {
  /**
   * Indicates whether the user has been successfully logged out.
   * @type {boolean}
   */
  @IsNotEmpty({ message: 'Logout status must not be empty' })
  @IsBoolean({ message: 'Logout status must be a boolean' })
  @Field({
    description: 'Indicates whether the user has been successfully logged out.',
  })
  isLoggedOut: boolean;
}
