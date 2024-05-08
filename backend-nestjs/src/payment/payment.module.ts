// Dependencies
import { Module } from '@nestjs/common';

// Services
import { PaymentService } from './payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { WalletService } from 'src/wallet/wallet.service';
// Resolvers
import { PaymentResolver } from './payment.resolver';

/**
 * The payment module, containing all payment-related functionality.
 *
 * @export
 * @class PaymentModule
 */
@Module({
  providers: [
    PaymentResolver,
    PaymentService,
    PrismaService,
    SubscriptionService,
    WalletService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
