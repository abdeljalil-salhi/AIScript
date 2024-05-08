// Dependencies
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Payment } from 'src/payment/entities/payment.entity';

/**
 * Represents a subscription entity that is used by GraphQL
 *
 * @export
 * @class Subscription
 * @module SubscriptionModule
 */
@ObjectType()
export class Subscription {
  /**
   * Unique identifier of the subscription
   * @type {string}
   */
  @IsNotEmpty({ message: 'Subscription ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the subscription' })
  public id: string;

  /**
   * ID of the associated user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Subscription user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the subscription',
  })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  @Field(() => User, {
    description: 'Subscription associated user entity',
    nullable: true,
  })
  user?: User;

  /**
   * Subscription plan ID
   * @type {string}
   */
  @IsNotEmpty({ message: 'Subscription plan ID must not be empty' })
  @Field(() => String, { description: 'ID of the subscription plan' })
  public planId: string;

  /**
   * Associated plan entity
   * @type {Plan}
   */
  @Field(() => Plan, {
    description: 'Subscription associated plan entity',
    nullable: true,
  })
  plan?: Plan;

  /**
   * ID of the associated payment
   * @type {string}
   */
  @IsNotEmpty({ message: 'Subscription payment ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated payment that owns the subscription',
  })
  public paymentId: string;

  /**
   * Associated payment entity
   * @type {Payment}
   */
  @Field(() => Payment, {
    description: 'Subscription associated payment entity',
    nullable: true,
  })
  payment?: Payment;

  /**
   * Number of days with service ongoing
   * @type {number}
   * @default 0
   */
  @IsNotEmpty({ message: 'Subscription days with service must not be empty' })
  @IsNumber({}, { message: 'Subscription days with service must be a number' })
  @Field(() => Number, {
    description: 'Number of days with service ongoing',
    defaultValue: 0,
  })
  public daysWithService: number;

  /**
   * Date and time of the subscription creation
   * @type {Date}
   * @example '2021-07-01T00:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Subscription creation date must not be empty' })
  @IsDate({ message: 'Subscription creation date must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the subscription creation',
  })
  public createdAt: Date;

  /**
   * Date and time of the subscription last update
   * @type {Date}
   * @example '2021-07-01T00:00:00.000Z'
   */
  @IsNotEmpty({ message: 'Subscription updated at must not be empty' })
  @IsDate({ message: 'Subscription updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the subscription last update',
  })
  public updatedAt: Date;
}
