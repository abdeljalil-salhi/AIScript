import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents an avatar entity that is used by GraphQL
 *
 * @export
 * @class Avatar
 * @module AvatarModule
 */
@ObjectType()
export class Avatar {
  /**
   * Unique identifier of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'Avatar ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the avatar' })
  public id: string;

  /**
   * ID of the associated user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Avatar user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the avatar',
  })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  user?: any;

  /**
   * Default file name of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'Avatar default file name must not be empty' })
  @Field(() => String, { description: 'Default file name of the avatar' })
  public defaultFilename: string;

  /**
   * File name of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'Avatar file name must not be empty' })
  @Field(() => String, { description: 'File name of the avatar' })
  public filename: string;

  /**
   * Date and time of the avatar creation
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Avatar created at must not be empty' })
  @IsDate({ message: 'Avatar created at must be a date' })
  @Field(() => Date, { description: 'Date and time of the avatar creation' })
  public createdAt: Date;

  /**
   * Date and time of the avatar last update
   * @type {Date}
   * @example 2021-09-01T12:00:00.000Z
   */
  @IsNotEmpty({ message: 'Avatar updated at must not be empty' })
  @IsDate({ message: 'Avatar updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the avatar last update',
  })
  public updatedAt: Date;
}
