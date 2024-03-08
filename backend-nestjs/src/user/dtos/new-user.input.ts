// Dependencies
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to create a new user;
 * This is used as input to the `createUser` mutation.
 *
 * @export
 * @class NewUserInput
 * @module UserModule
 */
@InputType()
export class NewUserInput {
  /**
   * Username of the user
   * @type {string}
   */
  @IsNotEmpty({ message: 'New user username must not be empty' })
  @IsString({ message: 'New user username must be a string' })
  @Field(() => String, { description: 'Username of the user' })
  username: string;

  /**
   * Avatar of the user
   * @type {AvatarInput}
   */
  @IsNotEmpty({ message: 'New user avatar must not be empty' })
  @Field(() => AvatarInput, { description: 'Avatar of the user' })
  avatar: AvatarInput;

  /**
   * Connection details of the user
   * @type {ConnectionInput}
   */
  @IsNotEmpty({ message: 'New user connection must not be empty' })
  @Field(() => ConnectionInput, {
    description: 'Connection details of the user',
  })
  connection: ConnectionInput;
}

/**
 * Input type for the avatar of a new user;
 * This is used as input to the `createUser` mutation.
 *
 * @export
 * @class AvatarInput
 * @module UserModule
 */
@InputType()
class AvatarInput {
  /**
   * Filename of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'New user avatar filename must not be empty' })
  @IsString({ message: 'New user avatar filename must be a string' })
  @Field(() => String, { description: 'Filename of the avatar' })
  filename: string;
}

/**
 * Input type for the connection of a new user;
 * This is used as input to the `createUser` mutation.
 *
 * @export
 * @class ConnectionInput
 * @module UserModule
 */
@InputType()
class ConnectionInput {
  /**
   * Email of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'New user connection email must not be empty' })
  @IsEmail({}, { message: 'New user connection email must be a valid email' })
  @Field(() => String, { description: 'Email of the connection' })
  email: string;

  /**
   * Password of the connection
   * @type {string}
   */
  @IsNotEmpty({ message: 'New user connection password must not be empty' })
  @IsString({ message: 'New user connection password must be a string' })
  @Field(() => String, { description: 'Password of the connection' })
  password: string;

  /**
   * Provider of the connection
   * @type {string}
   * @enum {['local', 'google']}
   */
  @IsNotEmpty({ message: 'New user connection provider must not be empty' })
  @IsString({ message: 'New user connection provider must be a string' })
  @Field(() => String, { description: 'Provider of the connection' })
  provider: string;
}
