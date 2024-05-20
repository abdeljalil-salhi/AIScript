// Dependencies
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { Connection } from 'src/connection/entities/connection.entity';

/**
 * Represents a forgot password entity that is used by GraphQL
 *
 * @export
 * @class ForgotPassword
 * @module ForgotPasswordModule
 */
@ObjectType()
export class ForgotPassword {
  /**
   * Unique identifier of the forgot password
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password ID must not be empty' })
  @Field(() => String, {
    description: 'Unique identifier of the forgot password',
  })
  public id: string;

  /**
   * ID of the associated connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password connection ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated connection',
  })
  public connectionId: string;

  /**
   * Associated connection entity
   * @type {Connection}
   */
  @Field(() => Connection, {
    description: 'Forgot password associated connection entity',
    nullable: true,
  })
  public connection?: Connection;

  /**
   * Email address of the account requesting the password reset
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password email must not be empty' })
  @IsEmail({}, { message: 'Email address is not valid' })
  @Field(() => String, {
    description: 'Email address of the account requesting the password reset',
  })
  public email: string;

  /**
   * Reset token
   * @type {string}
   */
  @IsNotEmpty({ message: 'Forgot password token must not be empty' })
  @IsString({ message: 'Forgot password token must be a string' })
  @Field(() => String, {
    description: 'Reset token',
  })
  public token: string;

  /**
   * Date the reset token was last sent
   * @type {Date}
   */
  @IsNotEmpty({ message: 'Forgot password last sent at must not be empty' })
  @IsDate({ message: 'Forgot password last sent at must be a date' })
  @Field(() => Date, {
    description: 'Date the reset token was last sent',
  })
  public lastSentAt: Date;

  /**
   * Expiration date of the password reset token
   * @type {Date}
   */
  @IsNotEmpty({ message: 'Forgot password expiration date must not be empty' })
  @IsDate({ message: 'Forgot password expiration date must be a date' })
  @Field(() => Date, {
    description: 'Expiration date of the password reset token',
  })
  public expiresAt: Date;

  /**
   * Reset token creation date
   * @type {Date}
   */
  @IsNotEmpty({ message: 'Forgot password creation date must not be empty' })
  @IsDate({ message: 'Forgot password creation date must be a date' })
  @Field(() => Date, {
    description: 'Creation date of the password reset token',
  })
  public createdAt: Date;

  /**
   * Reset token update date
   * @type {Date}
   */
  @IsNotEmpty({ message: 'Forgot password update date must not be empty' })
  @IsDate({ message: 'Forgot password update date must be a date' })
  @Field(() => Date, {
    description: 'Update date of the password reset token',
  })
  public updatedAt: Date;
}
