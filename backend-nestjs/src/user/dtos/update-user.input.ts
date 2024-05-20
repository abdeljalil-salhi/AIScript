// Dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
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
   * @nullable
   * @type {string}
   */
  @IsOptional()
  @IsNotEmpty({ message: 'New username must not be empty' })
  @IsString({ message: 'New username must be a string' })
  @MinLength(3, {
    message: 'New username must be at least 3 characters long',
  })
  @MaxLength(20, {
    message: 'New username must be at most 20 characters long',
  })
  @Field(() => String, {
    description: 'The new username of the user',
    nullable: true,
  })
  username?: string;

  /**
   * The new email of the user
   * @nullable
   * @type {string}
   */
  @IsOptional()
  @IsNotEmpty({ message: 'New email must not be empty' })
  @IsEmail({}, { message: 'New email must be a valid email' })
  @MinLength(5, {
    message: 'New email must be at least 5 characters long',
  })
  @MaxLength(50, {
    message: 'New email must be at most 50 characters long',
  })
  @Field(() => String, {
    description: 'The new email of the user',
    nullable: true,
  })
  email?: string;
}
