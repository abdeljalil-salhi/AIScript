// Dependencies
import { Module } from '@nestjs/common';

// Services
import { SubscriptionService } from './subscription.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataService } from 'src/data/data.service';
import { PlanService } from 'src/plan/plan.service';
import { WalletService } from 'src/wallet/wallet.service';
// Resolvers
import { SubscriptionResolver } from './subscription.resolver';

/**
 * The subscription module, containing all subscription-related functionality.
 *
 * @export
 * @class SubscriptionModule
 */
@Module({
  providers: [
    SubscriptionResolver,
    SubscriptionService,
    PlanService,
    WalletService,
    DataService,
    PrismaService,
  ],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
