// Dependencies
import { Module } from '@nestjs/common';

// Services
import { WalletService } from './wallet.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Resolvers
import { WalletResolver } from './wallet.resolver';

/**
 * Represents the wallet module that encapsulates all wallet-related features
 * and functionalities.
 *
 * @export
 * @class WalletModule
 */
@Module({
  providers: [WalletResolver, WalletService, PrismaService],
})
export class WalletModule {}
