// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { NewPaymentInput } from './dtos/new-payment.input';
// Entities
import { Payment } from './entities/payment.entity';

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
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new payment entity.
   *
   * @param {NewPaymentInput} newPaymentInput - The input data to create a new payment.
   * @returns {Promise<Payment>} - The newly created payment entity.
   */
  public async createPayment(
    newPaymentInput: NewPaymentInput,
  ): Promise<Payment> {
    return this.prismaService.payment.create({
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
  }
}
