// Dependencies
import { Args, Mutation, Resolver } from '@nestjs/graphql';

// Services
import { PaymentService } from './payment.service';
// DTOs
import { SubscribeInput } from './dtos/subscribe.input';
// Entities
import { Payment } from './entities/payment.entity';

/**
 * The payment resolver that encapsulates all payment-related GraphQL queries and mutations.
 *
 * @export
 * @class PaymentResolver
 * @module PaymentModule
 */
@Resolver()
export class PaymentResolver {
  /**
   * Creates an instance of the PaymentResolver class.
   *
   * @param {PaymentService} paymentService - The PaymentService instance for handling payment operations.
   */
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Mutation to create a new payment entity while subscribing to a plan.
   *
   * @mutation
   * @param {SubscribeInput} subscribeInput - The input data to create a new payment.
   * @returns {Promise<Payment>} - The newly created payment entity.
   */
  @Mutation(() => Payment, {
    name: 'subscribe',
    description: 'Creates a new payment entity while subscribing to a plan.',
  })
  public async subscribe(
    @Args('subscribeInput') subscribeInput: SubscribeInput,
  ): Promise<Payment> {
    return this.paymentService.createPayment(subscribeInput);
  }
}
