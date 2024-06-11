// Dependencies
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Represents a book entity that is used by GraphQL
 * Encapsulates fundamental book-related data
 *
 * @export
 * @class Book
 * @module BookModule
 */
@ObjectType()
export class Book {
  /**
   * Unique identifier of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the book' })
  public id: string;

  /**
   * ID of the book owner
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book owner ID must not be empty' })
  @Field(() => String, { description: 'ID of the book owner' })
  public ownerId: string;

  /**
   * Associated user entity
   * @type {User}
   * @nullable
   */
  @Field(() => User, {
    description: 'Owner user associated with the book',
    nullable: true,
  })
  public owner?: User;

  /**
   * Author of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book author must not be empty' })
  @IsString({ message: 'Book author must be a string' })
  @Field(() => String, { description: 'Author of the book' })
  public author: string;

  /**
   * Title of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book title must not be empty' })
  @IsString({ message: 'Book title must be a string' })
  @Field(() => String, { description: 'Title of the book' })
  public title: string;

  /**
   * Topic of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book topic must not be empty' })
  @IsString({ message: 'Book topic must be a string' })
  @Field(() => String, { description: 'Topic of the book' })
  public topic: string;

  /**
   * Target audience of the book
   * @type {string}
   * @nullable
   */
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'Book target audience must not be empty' })
  @IsString({ message: 'Book target audience must be a string' })
  @Field(() => String, {
    description: 'Target audience of the book',
    nullable: true,
  })
  public targetAudience?: string;

  /**
   * Number of chapters in the book
   * @type {number}
   */
  @IsNotEmpty({ message: 'Book number of chapters must not be empty' })
  @IsNumber({}, { message: 'Book number of chapters must be a number' })
  @Field(() => Number, { description: 'Number of chapters in the book' })
  public numChapters: number;

  /**
   * Number of subsections in the book
   * @type {number}
   */
  @IsNotEmpty({ message: 'Book number of subsections must not be empty' })
  @IsNumber({}, { message: 'Book number of subsections must be a number' })
  @Field(() => Number, { description: 'Number of subsections in the book' })
  public numSubsections: number;

  /**
   * Cover image URL of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book cover image URL must not be empty' })
  @IsString({ message: 'Book cover image URL must be a string' })
  @Field(() => String, { description: 'Cover image URL of the book' })
  public cover: string;

  /**
   * Book document URL
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book document URL must not be empty' })
  @IsString({ message: 'Book document URL must be a string' })
  @Field(() => String, { description: 'Book document URL' })
  public document: string;

  /**
   * Book PDF document URL
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book PDF document URL must not be empty' })
  @IsString({ message: 'Book PDF document URL must be a string' })
  @Field(() => String, { description: 'Book PDF document URL' })
  public pdf: string;

  /**
   * Whether the book is showcased or not
   * @type {boolean}
   */
  @IsNotEmpty({ message: 'Book showcase status must not be empty' })
  @IsBoolean({ message: 'Book showcase status must be a boolean' })
  @Field(() => Boolean, {
    description: 'Whether the book is showcased or not',
    defaultValue: false,
  })
  public isShowcase: boolean;

  /**
   * Book creation date
   * @type {Date}
   * @example '2021-01-01T00:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Book creation date must not be empty' })
  @IsDate({ message: 'Book creation date must be a date' })
  @Field(() => Date, { description: 'Book creation date' })
  public createdAt: Date;

  /**
   * Book last update date
   * @type {Date}
   * @example '2021-01-01T00:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Book last update date must not be empty' })
  @IsDate({ message: 'Book last update date must be a date' })
  @Field(() => Date, { description: 'Book last update date' })
  public updatedAt: Date;
}
