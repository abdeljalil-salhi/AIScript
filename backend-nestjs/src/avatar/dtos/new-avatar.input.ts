// Dependencies
import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Input type to create a new avatar;
 * This is used as input to the `createAvatar` mutation.
 *
 * @export
 * @class NewAvatarInput
 * @module AvatarModule
 */
@InputType()
export class NewAvatarInput {
  /**
   * Associated user entity that owns the avatar
   * @type {User}
   */
  @IsNotEmpty({ message: 'New avatar user must not be empty' })
  @Field(() => User, {
    description: 'Associated user entity that owns the avatar',
  })
  public user: User;

  /**
   * Default file name of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'New avatar default file name must not be empty' })
  @IsString({ message: 'New avatar default file name must be a string' })
  @Field(() => String, { description: 'Default file name of the avatar' })
  public defaultFilename: string;

  /**
   * File name of the avatar
   * @type {string}
   */
  @IsNotEmpty({ message: 'New avatar file name must not be empty' })
  @IsString({ message: 'New avatar file name must be a string' })
  @Field(() => String, { description: 'File name of the avatar' })
  public filename: string;
}
