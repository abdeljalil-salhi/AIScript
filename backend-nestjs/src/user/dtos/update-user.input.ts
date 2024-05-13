// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to update a user;
 * This is used as input to the `updateUser` mutation.
 *
 * @export
 * @class UpdateUserInput
 * @module UserModule
 */
@InputType()
export class UpdateUserInput {
  /**
   * The ID of the user to update
   * @type {string}
   */
  @IsNotEmpty({ message: 'User ID must not be empty' })
  @IsString({ message: 'User ID must be a string' })
  @Field(() => String, { description: 'The ID of the user to update' })
  userId: string;

  /**
   * The new username of the user
   * @type {string}
   */
  @Field(() => String, {
    description: 'The new username of the user',
    nullable: true,
  })
  username?: string;

  /**
   * The new email of the user
   * @type {string}
   */
  @Field(() => String, {
    description: 'The new email of the user',
    nullable: true,
  })
  email?: string;
}
