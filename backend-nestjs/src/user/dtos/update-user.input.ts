// Dependencies
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
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
  public userId: string;

  /**
   * The new username of the user
   * @nullable
   * @type {string}
   */
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'New username must not be empty' })
  @IsString({ message: 'New username must be a string' })
  @MinLength(4, {
    message: 'New username must be at least 4 characters long',
  })
  @MaxLength(20, {
    message: 'New username must be at most 20 characters long',
  })
  @Field(() => String, {
    description: 'The new username of the user',
    nullable: true,
  })
  public username?: string;

  /**
   * The new email of the user
   * @nullable
   * @type {string}
   */
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'New email must not be empty' })
  @IsEmail({}, { message: 'New email must be a valid email' })
  @MinLength(6, {
    message: 'New email must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'New email must be at most 50 characters long',
  })
  @Field(() => String, {
    description: 'The new email of the user',
    nullable: true,
  })
  public email?: string;
}
