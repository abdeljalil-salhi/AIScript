// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
// DTOs
import { SubscribeInput } from './dtos/subscribe.input';
import { NewSubscriptionInput } from 'src/subscription/dtos/new-subscription.input';
// Entities
import { Payment } from './entities/payment.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

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
   * @param {SubscribeInput} subscribeInput - The input data to create a new payment.
   * @returns {Promise<Payment>} - The newly created payment entity.
   */
  public async createPayment(subscribeInput: SubscribeInput): Promise<Payment> {
    let payment: Payment = await this.prismaService.payment.create({
      data: {
        amount: subscribeInput.amount,
        orderId: subscribeInput.orderId,
        paymentSource: subscribeInput.paymentSource,
        paypalSubId: subscribeInput.paypalSubId,
        subscriptionId: 'subscriptionId',
        user: {
          connect: {
            id: subscribeInput.userId,
          },
        },
      },
    });

    // Create a new subscription input object
    const newSubscriptionInput: NewSubscriptionInput = {
      userId: subscribeInput.userId,
      planId: subscribeInput.planId,
      paymentId: payment.id,
    };

    // Create a new subscription entity associated with the payment
    const subscription: Subscription =
      await this.subscriptionService.createSubscription(newSubscriptionInput);

    // Update the payment entity with the subscription ID
    payment = await this.prismaService.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        subscriptionId: subscription.id,
      },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    });

    return payment;
  }
}
