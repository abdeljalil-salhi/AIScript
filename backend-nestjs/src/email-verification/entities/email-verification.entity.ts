// Dependencies
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Connection } from 'src/connection/entities/connection.entity';

/**
 * Represents an email verification entity that is used by GraphQL
 *
 * @export
 * @class EmailVerification
 * @module EmailVerificationModule
 */
@ObjectType()
export class EmailVerification {
  /**
   * Unique identifier of the email verification
   * @type {string}
   */
  @IsNotEmpty({ message: 'Email verification ID must not be empty' })
  @Field(() => String, {
    description: 'Unique identifier of the email verification',
  })
  public id: string;

  /**
   * ID of the associated connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'Email verification connection ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated connection',
  })
  public connectionId: string;

  /**
   * Associated connection entity
   * @type {Connection}
   */
  @Field(() => Connection, {
    description: 'Email verification associated connection entity',
    nullable: true,
  })
  connection?: Connection;

  /**
   * Email address to verify
   * @type {string}
   */
  @IsNotEmpty({ message: 'Email verification email must not be empty' })
  @IsEmail({}, { message: 'Email address is not valid' })
  @Field(() => String, {
    description: 'Email address to verify',
  })
  public email: string;

  /**
   * Verification token
   * @type {string}
   */
  @IsNotEmpty({ message: 'Email verification token must not be empty' })
  @IsString({ message: 'Email verification token must be a string' })
  @Field(() => String, {
    description: 'Verification token',
  })
  public token: string;

  /**
   * Verification token last sent at
   * @type {Date}
   */
  @IsNotEmpty({ message: 'Email verification last sent at must not be empty' })
  @IsDate({ message: 'Email verification last sent at must be a date' })
  @Field(() => Date, {
    description: 'Verification token last sent at',
  })
  public lastSentAt: Date;

  /**
   * Verification token expiration date
   * @type {Date}
   * @example 2021-01-01T00:00:00.000Z
   */
  @IsNotEmpty({
    message: 'Email verification expiration date must not be empty',
  })
  @IsDate({ message: 'Email verification expiration date must be a date' })
  @Field(() => Date, {
    description: 'Verification token expiration date',
  })
  public expiresAt: Date;

  /**
   * Verification token creation date
   * @type {Date}
   */
  @IsNotEmpty({
    message: 'Email verification creation date must not be empty',
  })
  @IsDate({ message: 'Email verification creation date must be a date' })
  @Field(() => Date, {
    description: 'Verification token creation date',
    nullable: true,
  })
  public createdAt: Date;

  /**
   * Verification token update date
   * @type {Date}
   */
  @IsNotEmpty({
    message: 'Email verification update date must not be empty',
  })
  @IsDate({ message: 'Email verification update date must be a date' })
  @Field(() => Date, {
    description: 'Verification token update date',
  })
  public updatedAt: Date;
}
