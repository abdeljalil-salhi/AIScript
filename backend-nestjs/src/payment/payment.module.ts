// Dependencies
import { Module } from '@nestjs/common';

// Services
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { PaymentResolver } from './payment.resolver';

/**
 * The payment module, containing all payment-related functionality.
 *
 * @export
 * @class PaymentModule
 */
@Module({
  providers: [PaymentResolver, PaymentService, PrismaService],
  exports: [PaymentService],
})
export class PaymentModule {}
