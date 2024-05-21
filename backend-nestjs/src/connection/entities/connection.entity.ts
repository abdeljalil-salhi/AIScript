// Dependencies
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

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
  @IsNotEmpty({ message: 'Connection user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the connection',
  })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  @Field(() => User, {
    description: 'Connection associated user entity',
    nullable: true,
  })
  public user?: User;

  /**
   * Email of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'Connection email must not be empty' })
  @IsEmail({}, { message: 'Connection email must be a valid email address' })
  @MinLength(6, {
    message: 'Connection email must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'Connection email must be at most 50 characters long',
  })
  @Field(() => String, { description: 'Email of the connection' })
  public email: string;

  /**
   * Password of the connection
   * @type {string}
   * @nullable
   */
  @Field(() => String, {
    description: 'Password of the connection',
    nullable: true,
  })
  public password?: string;

  /**
   * Is email verified for the connection
   * @type {boolean}
   * @default false
   */
  @IsNotEmpty({ message: 'Connection is email verified must not be empty' })
  @IsBoolean({ message: 'Connection is email verified must be a boolean' })
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
  @IsNotEmpty({ message: 'Connection is 2FA enabled must not be empty' })
  @IsBoolean({ message: 'Connection is 2FA enabled must be a boolean' })
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
  @IsNotEmpty({ message: 'Connection provider must not be empty' })
  @Field(() => String, { description: 'Provider of the connection' })
  public provider: string;

  /**
   * One-time password associated with the connection
   * @type {string}
   * @nullable
   */
  @IsNotEmpty({ message: 'Connection one-time password must not be empty' })
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
  @IsNotEmpty({
    message: 'Connection one-time password created at must not be empty',
  })
  @IsDate({ message: 'Connection one-time password created at must be a date' })
  @Field(() => Date, {
    description:
      'The date and time when the connection one-time password was created',
    nullable: true,
  })
  public otpCreatedAt?: Date;

  /**
   * Date and time of the connection creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Connection created at must not be empty' })
  @IsDate({ message: 'Connection created at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the connection creation',
  })
  public createdAt: Date;

  /**
   * Date and time of the connection last update
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Connection updated at must not be empty' })
  @IsDate({ message: 'Connection updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the connection last update',
  })
  public updatedAt: Date;
}
