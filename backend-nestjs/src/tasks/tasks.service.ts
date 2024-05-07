// Dependencies
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// Services
import { WalletService } from 'src/wallet/wallet.service';

/**
 * Service dealing with scheduled tasks.
 *
 * @export
 * @class TasksService
 */
@Injectable()
export class TasksService {
  /**
   * Creates an instance of TasksService.
   *
   * @param {WalletService} walletService - The wallet service.
   */
  constructor(private readonly walletService: WalletService) {}

  /**
   * @description
   * This method is scheduled to run every 30 seconds.
   * It validates all wallets in the system.
   */
  @Cron('0,30 * * * * *')
  public async validateWallets(): Promise<void> {
    await this.walletService.validateWallets();
  }
}
