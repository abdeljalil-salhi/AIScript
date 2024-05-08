// Dependencies
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

/**
 * Input type to create a new subscription;
 * This is used as input to the `createSubscription` mutation.
 *
 * @export
 * @class NewSubscriptionInput
 * @module SubscriptionModule
 */
@InputType()
export class NewSubscriptionInput {
  /**
   * ID of the associated user that owns the subscription
   * @type {string}
   */
  @IsNotEmpty({ message: 'New subscription user ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the associated user that owns the subscription',
  })
  public userId: string;

  /**
   * Subscription plan ID
   * @type {string}
   */
  @IsNotEmpty({ message: 'Subscription plan ID must not be empty' })
  @Field(() => String, { description: 'ID of the subscription plan' })
  public planId: string;

  /**
   * Payment ID of the subscription
   * @type {string}
   */
  @IsNotEmpty({ message: 'New subscription payment ID must not be empty' })
  @Field(() => String, {
    description: 'ID of the payment that created the subscription',
  })
  public paymentId: string;
}
