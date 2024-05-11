// Dependencies
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents a data entity that is used to store persistent data in the database.
 *
 * @export
 * @class Data
 * @module DataModule
 */
@ObjectType()
export class Data {
  /**
   * Unique identifier of the data entity
   * @type {string}
   */
  @IsNotEmpty({ message: 'Data ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the data entity' })
  public id: string;

  /**
   * Data key
   * @type {string}
   */
  @IsNotEmpty({ message: 'Data key must not be empty' })
  @IsString({ message: 'Data key must be a string' })
  @Field(() => String, { description: 'Data key' })
  public key: string;

  /**
   * Data value
   * @type {string}
   */
  @IsNotEmpty({ message: 'Data value must not be empty' })
  @IsString({ message: 'Data value must be a string' })
  @Field(() => String, { description: 'Data value' })
  public value: string;

  /**
   * Date and time when the data entity was created
   * @type {Date}
   * @example '2022-04-01T12:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Data creation date must not be empty' })
  @IsDate({ message: 'Data creation date must be a valid date' })
  @Field(() => Date, {
    description: 'Date and time when the data entity was created',
  })
  public createdAt: Date;

  /**
   * Date and time when the data entity was last updated
   * @type {Date}
   * @example '2022-04-01T12:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Data last update date must not be empty' })
  @IsDate({ message: 'Data last update date must be a valid date' })
  @Field(() => Date, {
    description: 'Date and time when the data entity was last updated',
  })
  public updatedAt: Date;
}
