// Dependencies
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { Avatar } from 'src/avatar/entities/avatar.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Connection } from 'src/connection/entities/connection.entity';

/**
 * Represents a user entity that is used by GraphQL
 * Encapsulates fundamental user-related data
 *
 * @export
 * @class User
 * @module UserModule
 */
@ObjectType()
export class User {
  /**
   * Unique identifier of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'User ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the user' })
  public id: string;

  /**
   * Associated avatar entity
   * @type {Avatar}
   * @nullable
   */
  @Field(() => Avatar, {
    description: 'User associated avatar entity',
    nullable: true,
  })
  public avatar?: Avatar;

  /**
   * Associated wallet entity
   * @type {Wallet}
   * @nullable
   */
  @Field(() => Wallet, {
    description: 'User associated wallet entity',
    nullable: true,
  })
  public wallet?: Wallet;

  /**
   * Associated connection entity
   * @type {Connection}
   * @nullable
   */
  @Field(() => Connection, {
    description: 'User associated connection entity',
    nullable: true,
  })
  public connection?: Connection;

  /**
   * Username of the user
   * @type {string}
   * @minLength 3
   * @maxLength 30
   * @example 'john_doe'
   */
  @IsNotEmpty({ message: 'User username must not be empty' })
  @MinLength(3, {
    message: 'User username must be at least 3 characters long',
  })
  @MaxLength(30, {
    message: 'User username must be at most 30 characters long',
  })
  @Field(() => String, { description: 'Username of the user' })
  public username: string;

  /**
   * Whether or not the user is an admin
   * @type {boolean}
   * @default false
   */
  @IsNotEmpty({ message: 'User is admin must not be empty' })
  @IsBoolean({ message: 'User is admin must be a boolean' })
  @Field(() => Boolean, {
    description: 'Indicates whether the user is an admin',
    defaultValue: false,
  })
  public isAdmin: boolean;

  /**
   * Refresh token of the user
   * @type {string}
   * @nullable
   */
  @IsString({ message: 'User refresh token must be a string' })
  @Field(() => String, {
    description: 'Refresh token of the user',
    nullable: true,
  })
  public refreshToken?: string;

  /**
   * Date and time of the user creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'User created at must not be empty' })
  @IsDate({ message: 'User created at must be a date' })
  @Field(() => Date, { description: 'Date and time of the user creation' })
  public createdAt: Date;

  /**
   * Date and time of the user last update
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'User updated at must not be empty' })
  @IsDate({ message: 'User updated at must be a date' })
  @Field(() => Date, { description: 'Date and time of the user last update' })
  public updatedAt: Date;
}
