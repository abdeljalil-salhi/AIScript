// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { NewWalletInput } from './dtos/new-wallet.input';
// Entities
import { Wallet } from './entities/wallet.entity';

/**
 * The wallet service that encapsulates all wallet-related features and functionalities.
 * It is used by the wallet resolver to perform CRUD operations.
 *
 * @export
 * @class WalletService
 * @module WalletModule
 */
@Injectable()
export class WalletService {
  /**
   * Creates an instance of the WalletService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new wallet entity.
   *
   * @param {NewWalletInput} newWalletInput - The input data to create a new wallet.
   * @returns {Promise<Wallet>} - The newly created wallet entity.
   */
  public async createWallet(newWalletInput: NewWalletInput): Promise<Wallet> {
    return this.prismaService.wallet.create({
      data: {
        ...newWalletInput,
        user: {
          connect: {
            id: newWalletInput.user.id,
          },
        },
      },
    });
  }

  public async getWalletById(id: string): Promise<Wallet> {
    return this.prismaService.wallet.findUnique({ where: { id } });
  }

  public async getWallets(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }

  public async updateWallet(id: string, newBalance: number): Promise<Wallet> {
    return this.prismaService.wallet.update({
      where: { id },
      data: { balance: newBalance },
    });
  }

  public async validateWallets(): Promise<void> {
    const wallets: Wallet[] = await this.prismaService.wallet.findMany();

    // Map the updates for each wallet
    const updates: Promise<void>[] = wallets.map(async (wallet: Wallet) => {
      const updateData: {
        balance?: number;
        freeCredits?: number;
        subscriptionCredits?: number;
        topUpCredits?: number;
      } = {};

      if (wallet.balance < 0) updateData.balance = 0;

      if (wallet.freeCredits < 0) updateData.freeCredits = 0;

      if (wallet.subscriptionCredits < 0) updateData.subscriptionCredits = 0;

      if (wallet.topUpCredits < 0) updateData.topUpCredits = 0;

      // If any update is needed, execute it
      if (Object.keys(updateData).length > 0) {
        await this.prismaService.wallet.update({
          where: {
            id: wallet.id,
          },
          data: updateData,
        });
      }

      // If the balance is incorrect, update it
      if (
        wallet.balance !==
        wallet.freeCredits + wallet.subscriptionCredits + wallet.topUpCredits
      ) {
        await this.prismaService.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance:
              wallet.freeCredits +
              wallet.subscriptionCredits +
              wallet.topUpCredits,
          },
        });
      }
    });

    // Wait for all updates to complete
    await Promise.all(updates);
  }
}
