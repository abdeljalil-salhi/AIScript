// Dependencies
import { Module } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { DataService } from 'src/data/data.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { PlanService } from 'src/plan/plan.service';
import { TasksService } from './tasks.service';
import { WalletService } from 'src/wallet/wallet.service';
import { EmailVerificationService } from 'src/email-verification/email-verification.service';
import { ConnectionService } from 'src/connection/connection.service';

/**
 * Represents the tasks module that encapsulates all scheduled tasks.
 *
 * @export
 * @class TasksModule
 */
@Module({
  providers: [
    TasksService,
    PrismaService,
    WalletService,
    SubscriptionService,
    PlanService,
    DataService,
    EmailVerificationService,
    ConnectionService,
  ],
})
export class TasksModule {}
