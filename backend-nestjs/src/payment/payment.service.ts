// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
// DTOs
import { NewPaymentInput } from './dtos/new-payment.input';
// Entities
import { Payment } from './entities/payment.entity';
import { NewSubscriptionInput } from 'src/subscription/dtos/new-subscription.input';

/**
 * Service for handling payment-related operations.
 *
 * @export
 * @class PaymentService
 * @module PaymentModule
 */
@Injectable()
export class PaymentService {
  /**
   * Creates an instance of the PaymentService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  /**
   * Creates a new payment entity.
   * Creates a new subscription entity that is associated with the payment.
   *
   * @param {NewPaymentInput} newPaymentInput - The input data to create a new payment.
   * @returns {Promise<Payment>} - The newly created payment entity.
   */
  public async createPayment(
    newPaymentInput: NewPaymentInput,
  ): Promise<Payment> {
    const payment: Payment = await this.prismaService.payment.create({
      data: {
        amount: newPaymentInput.amount,
        orderId: newPaymentInput.orderId,
        paymentSource: newPaymentInput.paymentSource,
        paypalSubId: newPaymentInput.paypalSubId,
        subscriptionId: 'subscriptionId',
        user: {
          connect: {
            id: newPaymentInput.userId,
          },
        },
      },
    });

    // Create a new subscription input object
    const newSubscriptionInput: NewSubscriptionInput = {
      userId: newPaymentInput.userId,
      planId: newPaymentInput.planId,
      paymentId: payment.id,
    };

    // Create a new subscription entity associated with the payment
    await this.subscriptionService.createSubscription(newSubscriptionInput);

    return payment;
  }
}
