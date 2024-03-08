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
}
