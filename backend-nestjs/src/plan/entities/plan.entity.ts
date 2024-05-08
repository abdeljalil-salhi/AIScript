// Dependencies
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

/**
 * Represents a plan entity that is used by GraphQL
 *
 * @export
 * @class Plan
 * @module PlanModule
 */
@ObjectType()
export class Plan {
  /**
   * Unique identifier of the plan
   * @type {string}
   */
  @IsNotEmpty({ message: 'Plan ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the plan' })
  public id: string;

  /**
   * Name of the plan
   * @type {string}
   */
  @IsNotEmpty({ message: 'Plan name must not be empty' })
  @IsString({ message: 'Plan name must be a string' })
  @Field(() => String, { description: 'Name of the plan' })
  public name: string;

  /**
   * Description of the plan
   * @type {string}
   */
  @IsNotEmpty({ message: 'Plan description must not be empty' })
  @IsString({ message: 'Plan description must be a string' })
  @Field(() => String, { description: 'Description of the plan' })
  public description: string;

  /**
   * Price of the plan
   * @type {number}
   */
  @IsNotEmpty({ message: 'Plan price must not be empty' })
  @IsNumber({}, { message: 'Plan price must be a number' })
  @Field(() => Number, { description: 'Price of the plan' })
  public price: number;

  /**
   * Duration of the plan
   * In days; 0 means basic plan, 30 means monthly plan, 365 means yearly plan
   * @type {number}
   */
  @IsNotEmpty({ message: 'Plan duration must not be empty' })
  @IsNumber({}, { message: 'Plan duration must be a number' })
  @Field(() => Number, { description: 'Duration of the plan' })
  public duration: number;

  /**
   * Date and time of the plan creation
   * @type {Date}
   * @example 2021-10-01T00:00:00.000Z
   */
  @IsNotEmpty({ message: 'Plan creation date must not be empty' })
  @IsDate({ message: 'Plan creation date must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the plan creation',
  })
  public createdAt: Date;

  /**
   * Date and time of the plan last update
   * @type {Date}
   * @example 2021-10-01T00:00:00.000Z
   */
  @IsNotEmpty({ message: 'Plan last update date must not be empty' })
  @IsDate({ message: 'Plan last update date must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the plan last update',
  })
  public updatedAt: Date;
}
