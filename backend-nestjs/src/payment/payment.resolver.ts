// Dependencies
import { Mutation, Resolver } from '@nestjs/graphql';

// Services
import { PaymentService } from './payment.service';
// DTOs
import { NewPaymentInput } from './dtos/new-payment.input';
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
   * Mutation to create a new payment entity.
   *
   * @mutation
   * @param {NewPaymentInput} newPaymentInput - The input data to create a new payment.
   * @returns {Promise<Payment>} - The newly created payment entity.
   */
  @Mutation(() => Payment, {
    name: 'createPayment',
    description: 'Creates a new payment entity.',
  })
  public async createPayment(
    newPaymentInput: NewPaymentInput,
  ): Promise<Payment> {
    return this.paymentService.createPayment(newPaymentInput);
  }
}
