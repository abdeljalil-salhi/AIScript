// Dependencies
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
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
}
