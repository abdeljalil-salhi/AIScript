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

  /**
   * Retrieves a wallet entity by its ID.
   *
   * @param {string} id - The ID of the wallet entity to retrieve.
   * @returns {Promise<Wallet>} - The wallet entity with the specified ID.
   */
  public async getWalletById(id: string): Promise<Wallet> {
    return this.prismaService.wallet.findUnique({ where: { id } });
  }

  /**
   * Retrieves all wallet entities.
   *
   * @returns {Promise<Wallet[]>} - An array of all wallet entities.
   */
  public async getAllWallets(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }

  /**
   * Updates a wallet entity.
   *
   * @param {string} id - The ID of the wallet entity to update.
   * @param {number} newBalance - The new balance to set for the wallet entity.
   * @returns {Promise<Wallet>} - The updated wallet entity.
   */
  public async updateWalletById(
    id: string,
    newBalance: number,
  ): Promise<Wallet> {
    return this.prismaService.wallet.update({
      where: { id },
      data: {
        balance: newBalance,
      },
    });
  }

  /**
   * Sets the subscription credits for a wallet entity.
   *
   * @param {string} id - The ID of the wallet entity to add credits to.
   * @param {number} credits - The number of credits to add to the wallet entity.
   * @returns {Promise<Wallet>} - The updated wallet entity.
   */
  public async setSubscriptionCreditsToWallet(
    id: string,
    credits: number,
  ): Promise<Wallet> {
    return this.prismaService.wallet.update({
      where: { id },
      data: {
        subscriptionCredits: credits,
      },
    });
  }

  /**
   * Validates all wallet entities to ensure that their balances are correct.
   * If a wallet's balance is negative, it is set to zero.
   * If a wallet's balance is incorrect, it is updated to reflect the sum of its credits.
   * This is a background task that should be run periodically to ensure data integrity.
   *
   * @returns {Promise<void>} - An empty promise.
   */
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
      )
        await this.updateWalletById(
          wallet.id,
          wallet.freeCredits + wallet.subscriptionCredits + wallet.topUpCredits,
        );
    });

    // Wait for all updates to complete
    await Promise.all(updates);
  }
}
