// Dependencies
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input type to create a new payment;
 * This is used as input to the `createPayment` mutation.
 *
 * @export
 * @class SubscribeInput
 * @module PaymentModule
 */
@InputType()
export class SubscribeInput {
  /**
   * ID of the associated user that owns the payment
   * @type {string}
   */
  @IsNotEmpty({ message: 'New payment user ID must not be empty' })
  @IsString({ message: 'New payment user ID must be a string' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the payment',
  })
  public userId: string;

  /**
   * ID of the associated plan that the payment is for
   * @type {string}
   */
  @IsNotEmpty({ message: 'New payment plan ID must not be empty' })
  @IsString({ message: 'New payment plan ID must be a string' })
  @Field(() => String, {
    description: 'ID of the associated plan that the payment is for',
  })
  public planId: string;

  /**
   * Amount of the payment
   * @type {number}
   */
  @IsNotEmpty({ message: 'New payment amount must not be empty' })
  @IsNumber({}, { message: 'New payment amount must be a number' })
  @Field(() => Number, { description: 'Amount of the payment' })
  public amount: number;

  /**
   * Order ID of the payment
   * @type {string}
   */
  @IsNotEmpty({ message: 'New payment order ID must not be empty' })
  @IsString({ message: 'New payment order ID must be a string' })
  @Field(() => String, { description: 'Order ID of the payment' })
  public orderId: string;

  /**
   * Subscription ID of the payment
   * @type {string}
   */
  @IsNotEmpty({
    message: 'New payment PayPal subscription ID must not be empty',
  })
  @IsString({ message: 'New payment PayPal subscription ID must be a string' })
  @Field(() => String, { description: 'PayPal subscription ID of the payment' })
  public paypalSubId: string;

  /**
   * Source of the payment
   * @type {string}
   */
  @IsNotEmpty({ message: 'New payment source must not be empty' })
  @IsString({ message: 'New payment source must be a string' })
  @Field(() => String, { description: 'Source of the payment' })
  public paymentSource: string;

  /**
   * Access token of the payment facilitator
   * @type {string}
   */
  @IsNotEmpty({
    message: 'New payment facilitator access token must not be empty',
  })
  @IsString({
    message: 'New payment facilitator access token must be a string',
  })
  @Field(() => String, {
    description: 'Access token of the payment facilitator',
  })
  public facilitatorAccessToken: string;
}
