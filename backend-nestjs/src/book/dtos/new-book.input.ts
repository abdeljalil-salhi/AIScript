// Dependencies
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to create a new book;
 * This is used as input to the `createBook` mutation.
 *
 * @export
 * @class NewBookInput
 * @module BookModule
 */
@InputType()
export class NewBookInput {
  /**
   * ID of the associated user that owns the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'New book owner ID must not be empty' })
  @Field(() => String, { description: 'ID of the book owner' })
  public ownerId: string;

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
   * Document URL of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book document URL must not be empty' })
  @IsString({ message: 'Book document URL must be a string' })
  @Field(() => String, { description: 'Document URL of the book' })
  public document: string;

  /**
   * PDF URL of the book
   * @type {string}
   */
  @IsNotEmpty({ message: 'Book PDF URL must not be empty' })
  @IsString({ message: 'Book PDF URL must be a string' })
  @Field(() => String, { description: 'PDF URL of the book' })
  public pdf: string;

  /**
   * Whether the book is a showcase item
   * @type {boolean}
   * @nullable
   */
  @ValidateIf((_, value) => value !== null)
  @IsNotEmpty({ message: 'Book showcase item must not be empty' })
  @IsBoolean({ message: 'Book showcase item must be a boolean' })
  @Field(() => Boolean, {
    description: 'Whether the book is a showcase item',
    nullable: true,
  })
  public isShowcase?: boolean;
}
