// Dependencies
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

// Entities
import { User } from 'src/user/entities/user.entity';

/**
 * Represents a payment entity that is used by GraphQL
 *
 * @export
 * @class Payment
 * @module PaymentModule
 */
@ObjectType()
export class Payment {
  /**
   * Unique identifier of the payment
   * @type {string}
   */
  @IsNotEmpty({ message: 'Payment ID must not be empty' })
  @Field(() => String, { description: 'Unique identifier of the payment' })
  public id: string;

  /**
   * ID of the associated user
   * @type {string}
   */
  @IsNotEmpty({ message: 'Payment user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the payment',
  })
  public userId: string;

  /**
   * Associated user entity
   * @type {User}
   */
  @Field(() => User, {
    description: 'Payment associated user entity',
    nullable: true,
  })
  user?: User;

  /**
   * Payment amount
   * @type {number}
   */
  @IsNotEmpty({ message: 'Payment amount must not be empty' })
  @IsNumber({}, { message: 'Payment amount must be a number' })
  @Field(() => Number, { description: 'Amount of the payment' })
  public amount: number;

  /**
   * Payment order ID
   * @type {string}
   */
  @IsNotEmpty({ message: 'Payment order ID must not be empty' })
  @IsString({ message: 'Payment order ID must be a string' })
  @Field(() => String, { description: 'Order ID of the payment' })
  public orderId: string;

  /**
   * PayPal subscription ID
   * @type {string}
   */
  @IsNotEmpty({ message: 'PayPal subscription ID must not be empty' })
  @IsString({ message: 'PayPal subscription ID must be a string' })
  @Field(() => String, { description: 'PayPal subscription ID of the payment' })
  public paypalSubId: string;

  /**
   * Payment subscription ID
   * @type {string}
   */
  @IsNotEmpty({ message: 'Payment subscription ID must not be empty' })
  @IsString({ message: 'Payment subscription ID must be a string' })
  @Field(() => String, { description: 'Subscription ID of the payment' })
  public subscriptionId: string;

  /**
   * Payment source
   * @type {string}
   */
  @IsNotEmpty({ message: 'Payment source must not be empty' })
  @IsString({ message: 'Payment source must be a string' })
  @Field(() => String, { description: 'Source of the payment' })
  public paymentSource: string;

  /**
   * Date and time of the payment creation
   * @type {Date}
   * @example 2021-07-01T00:00:00.000Z
   */
  @IsNotEmpty({ message: 'Payment created at must not be empty' })
  @IsDate({ message: 'Payment created at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the payment creation',
  })
  public createdAt: Date;

  /**
   * Date and time of the payment last update
   * @type {Date}
   * @example 2021-07-01T00:00:00.000Z
   */
  @IsNotEmpty({ message: 'Payment updated at must not be empty' })
  @IsDate({ message: 'Payment updated at must be a date' })
  @Field(() => Date, {
    description: 'Date and time of the payment last update',
  })
  public updatedAt: Date;
}
