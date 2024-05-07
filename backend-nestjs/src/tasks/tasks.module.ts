// Dependencies
import { Module } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksService } from './tasks.service';
import { WalletService } from 'src/wallet/wallet.service';

/**
 * Represents the tasks module that encapsulates all scheduled tasks.
 *
 * @export
 * @class TasksModule
 */
@Module({
  providers: [TasksService, WalletService, PrismaService],
})
export class TasksModule {}
