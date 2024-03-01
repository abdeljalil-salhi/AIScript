import { IsBoolean, IsDate, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents a connection entity that is used by GraphQL
 *
 * @export
 * @class Connection
 * @module ConnectionModule
 */
@ObjectType()
export class Connection {
  /**
   * Unique identifier of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'Connection ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the connection' })
  public id: string;

  /**
   * ID of the associated user
   * @type {string}
   */
  @IsNotEmpty({ message: 'User ID must not be empty' })
  @Field(() => String, { description: 'ID of the associated user' })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  user?: any;

  /**
   * Email of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Field(() => String, { description: 'Email of the connection' })
  public email: string;

  /**
   * Is email verified for the connection
   * @type {boolean}
   * @default false
   */
  @IsNotEmpty({ message: 'Is email verified must not be empty' })
  @IsBoolean({ message: 'Is email verified must be a boolean' })
  @Field(() => Boolean, {
    description: 'Indicates whether email is verified for the connection',
    defaultValue: false,
  })
  public isEmailVerified: boolean;

  /**
   * Is 2FA enabled for the connection
   * @type {boolean}
   * @default false
   */
  @IsNotEmpty({ message: 'Is 2FA enabled must not be empty' })
  @IsBoolean({ message: 'Is 2FA enabled must be a boolean' })
  @Field(() => Boolean, {
    description: 'Indicates whether 2FA is enabled for the connection',
    defaultValue: false,
  })
  public is2faEnabled: boolean;

  /**
   * Provider of the connection
   * @type {string}
   * @enum {['local', 'google']}
   */
  @IsNotEmpty({ message: 'Provider must not be empty' })
  @Field(() => String, { description: 'Provider of the connection' })
  public provider: string;

  /**
   * One-time password associated with the connection
   * @type {string}
   * @nullable
   */
  @IsNotEmpty({ message: 'OTP must not be empty' })
  @Field(() => String, {
    description: 'One-time password associated with the connection',
    nullable: true,
  })
  public otp?: string;

  /**
   * Date and time of the OTP creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   * @nullable
   */
  @IsNotEmpty({ message: 'OTP created at must not be empty' })
  @IsDate({ message: 'OTP created at must be a date' })
  @Field(() => Date, {
    description: 'The date and time when the one-time password was created',
    nullable: true,
  })
  public otpCreatedAt?: Date;

  /**
   * Date and time of the connection creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Created at must not be empty' })
  @IsDate({ message: 'Created at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the connection creation',
  })
  public createdAt: Date;

  /**
   * Date and time of the connection last update
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Updated at must not be empty' })
  @IsDate({ message: 'Updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the connection last update',
  })
  public updatedAt: Date;
}
