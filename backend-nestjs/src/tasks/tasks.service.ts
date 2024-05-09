// Dependencies
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// Services
import { SubscriptionService } from 'src/subscription/subscription.service';
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
  constructor(
    private readonly walletService: WalletService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  /**
   * @description
   * This method is scheduled to run every hour.
   * It validates all subscriptions in the system.
   */
  @Cron('0 0 * * * *') // Every hour.
  public async validateSubscriptions(): Promise<void> {
    await this.subscriptionService.validateSubscriptions();
  }

  /**
   * @description
   * This method is scheduled to run every month.
   * It refreshes the credits of all subscriptions in the system.
   */
  @Cron('0 0 0 1 * *') // At 00:00:00 on day-of-month 1.
  public async refreshSubscriptionsCredits(): Promise<void> {
    await this.subscriptionService.refreshSubscriptionsCredits();
  }

  /**
   * @description
   * This method is scheduled to run every 30 seconds.
   * It validates all wallets in the system.
   */
  @Cron('0,30 * * * * *') // Every 30 seconds.
  public async validateWallets(): Promise<void> {
    await this.walletService.validateWallets();
  }
}
