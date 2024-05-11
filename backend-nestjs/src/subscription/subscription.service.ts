// Dependencies
import { Injectable, InternalServerErrorException } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
import { DataService } from 'src/data/data.service';
import { PlanService } from 'src/plan/plan.service';
import { WalletService } from 'src/wallet/wallet.service';
// DTOs
import { NewSubscriptionInput } from './dtos/new-subscription.input';
// Entities
import { Subscription } from './entities/subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
// Includes
import { subscriptionIncludes } from './includes/subscription.includes';

/**
 * Service for handling subscription-related operations.
 *
 * @export
 * @class SubscriptionService
 * @module SubscriptionModule
 */
@Injectable()
export class SubscriptionService {
  /**
   * Creates an instance of the SubscriptionService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(
    private readonly prismaService: PrismaService,
    private readonly walletService: WalletService,
    private readonly planService: PlanService,
    private readonly dataService: DataService,
  ) {}

  /**
   * Creates a new subscription entity.
   *
   * @param {NewSubscriptionInput} newSubscriptionInput - The input data to create a new subscription.
   * @returns {Promise<Subscription>} - The newly created subscription entity.
   */
  public async createSubscription(
    newSubscriptionInput: NewSubscriptionInput,
  ): Promise<Subscription> {
    const oldSubscription: Subscription =
      await this.prismaService.subscription.update({
        where: {
          userId: newSubscriptionInput.userId,
        },
        data: {
          isActive: false,
          isDeactivated: true,
        },
      });

    if (!oldSubscription) return null;

    const subscription: Subscription =
      await this.prismaService.subscription.create({
        data: {
          ownerUserId: newSubscriptionInput.userId,
          user: {
            connect: {
              id: newSubscriptionInput.userId,
            },
          },
          plan: {
            connect: {
              id: newSubscriptionInput.planId,
            },
          },
          payment: {
            connect: {
              id: newSubscriptionInput.paymentId,
            },
          },
        },
        include: {
          ...subscriptionIncludes,
          user: {
            include: {
              wallet: true,
            },
          },
        },
      });

    // Update the wallet balance
    await this.walletService.setSubscriptionCreditsToWallet(
      subscription.user.wallet.id,
      subscription.plan.credits,
    );

    return subscription;
  }

  /**
   * Cancels a subscription entity.
   *
   * @param {string} id - The ID of the subscription entity to cancel.
   * @returns {Promise<Subscription>} - The updated subscription entity.
   */
  public async cancelSubscription(id: string): Promise<Subscription> {
    const subscription: Subscription =
      await this.prismaService.subscription.update({
        where: {
          id,
        },
        data: {
          isActive: false,
        },
        include: {
          ...subscriptionIncludes,
          user: {
            include: {
              wallet: true,
            },
          },
        },
      });

    const canceledSubscriptionsIds: string[] = Array.from(
      JSON.parse(
        await this.dataService.getDataVariables('canceledSubscriptionsIds'),
      ),
    );

    const canceledSubscriptionsIdsSet: Set<string> = new Set(
      canceledSubscriptionsIds,
    );
    canceledSubscriptionsIdsSet.add(subscription.id);

    if (subscription && subscription.isActive === false)
      await this.dataService.setDataVariables(
        'canceledSubscriptionsIds',
        JSON.stringify(Array.from(canceledSubscriptionsIdsSet)),
      );

    return subscription;
  }

  /**
   * Deactivates a subscription entity.
   *
   * @param {string} subscriptionId - The ID of the subscription entity to deactivate.
   * @param {string} walletId - The ID of the wallet entity associated with the subscription.
   * @returns {Promise<Subscription>} - The deactivated subscription entity.
   */
  public async deactivateSubscription(
    subscriptionId: string,
    walletId: string,
  ): Promise<Subscription> {
    const wallet: Wallet =
      await this.walletService.setSubscriptionCreditsToWallet(walletId, 0);

    if (wallet && wallet.subscriptionCredits === 0) {
      const user: User = await this.prismaService.user.update({
        where: {
          id: wallet.user.id,
        },
        data: {
          subscription: {
            create: {
              ownerUserId: wallet.user.id,
              plan: {
                connect: {
                  id: this.planService.getBasicPlanId(),
                },
              },
            },
          },
        },
        include: {
          subscription: true,
        },
      });

      if (!user) return null;

      return this.prismaService.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          isDeactivated: true,
        },
      });
    }

    return null;
  }

  /**
   * Retrieves all canceled subscription entities.
   *
   * @returns {Promise<Subscription[]>} - The list of canceled subscription entities.
   */
  public async getCanceledSubscriptions(): Promise<Subscription[]> {
    const canceledSubscriptionsIds: string[] = Array.from(
      JSON.parse(
        await this.dataService.getDataVariables('canceledSubscriptionsIds'),
      ),
    );

    return this.prismaService.subscription.findMany({
      where: {
        id: {
          in: Array.from(canceledSubscriptionsIds),
        },
      },
      include: {
        // Include the plan to check the duration
        plan: true,
        // Include the user to get the wallet ID
        user: {
          include: {
            wallet: true,
          },
        },
      },
    });
  }

  /**
   * Retrieves all subscription entities.
   *
   * @returns {Promise<Subscription[]>} - The list of subscription entities.
   */
  public async getAllSubscriptions(): Promise<Subscription[]> {
    return this.prismaService.subscription.findMany();
  }

  /**
   * Retrieves a subscription entity by its ID.
   *
   * @param {string} id - The ID of the subscription entity to retrieve.
   * @returns {Promise<Subscription>} - The subscription entity.
   */
  public async getSubscriptionById(id: string): Promise<Subscription> {
    return this.prismaService.subscription.findUnique({
      where: {
        id: id,
      },
      include: {
        ...subscriptionIncludes,
        user: {
          include: {
            wallet: true,
          },
        },
      },
    });
  }

  /**
   * Retrieves all subscription entities associated with a user.
   *
   * @param {string} userId - The ID of the user to retrieve subscriptions for.
   * @returns {Promise<Subscription[]>} - The list of subscription entities.
   */
  public async getSubscriptionsByUserId(
    userId: string,
  ): Promise<Subscription[]> {
    return this.prismaService.subscription.findMany({
      where: {
        ownerUserId: userId,
      },
      include: {
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Retrieves all subscription entities associated with a plan.
   *
   * @param {string} planId - The ID of the plan to retrieve subscriptions for.
   * @returns {Promise<Subscription[]>} - The list of subscription entities.
   */
  public async getSubscriptionsByPlanId(
    planId: string,
  ): Promise<Subscription[]> {
    return this.prismaService.subscription.findMany({
      where: {
        planId: planId,
      },
    });
  }

  /**
   * Deletes a subscription entity by its ID.
   *
   * @param {string} id - The ID of the subscription entity to delete.
   * @returns {Promise<Subscription>} - The deleted subscription entity.
   */
  public async deleteSubscriptionById(id: string): Promise<Subscription> {
    return this.prismaService.subscription.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * Deletes all subscription entities associated with a user.
   *
   * @param {string} userId - The ID of the user to delete subscriptions for.
   * @returns {Promise<string>} - A message indicating the success of the operation.
   */
  public async deleteSubscriptionsByUserId(userId: string): Promise<string> {
    await this.prismaService.subscription.deleteMany({
      where: {
        ownerUserId: userId,
      },
    });

    return `Subscriptions for user ${userId} have been deleted`;
  }

  /**
   * Validates all subscriptions in the system.
   * This method is scheduled to run every hour.
   * It increments the days with service for all subscriptions that have not been refreshed
   * in the last 24 hours.
   * If a canceled subscription has reached the end of its duration, it is deactivated.
   *
   * @returns {Promise<void>} - A promise indicating the success of the operation.
   */
  public async validateSubscriptions(): Promise<void> {
    /**
     * Increment the days with service for all subscriptions that have not been refreshed
     * in the last 24 hours.
     */
    await this.prismaService.subscription.updateMany({
      where: {
        refreshedAt: {
          lte: new Date(new Date().getTime() - 86400000),
        },
        isDeactivated: false,
      },
      data: {
        daysWithService: {
          increment: 1,
        },
        refreshedAt: new Date(),
      },
    });

    const canceledSubscriptions: Subscription[] =
      await this.getCanceledSubscriptions();

    /**
     * If the ongoing canceled subscription has reached the end of its duration,
     * deactivate the subscription and remove it from the list of canceled subscriptions.
     * The subscription credits will be set to 0.
     */
    await Promise.all(
      canceledSubscriptions.map(async (subscription: Subscription) => {
        if (
          subscription.daysWithService % subscription.plan.duration === 0 &&
          subscription.daysWithService !== 0
        ) {
          const deactivatedSubscription: Subscription =
            await this.deactivateSubscription(
              subscription.id,
              subscription.user.wallet.id,
            );

          const canceledSubscriptionsIds: string[] = Array.from(
            JSON.parse(
              await this.dataService.getDataVariables(
                'canceledSubscriptionsIds',
              ),
            ),
          );

          if (deactivatedSubscription)
            await this.dataService.setDataVariables(
              'canceledSubscriptionsIds',
              JSON.stringify(
                canceledSubscriptionsIds.filter(
                  (id: string) => id !== deactivatedSubscription.id,
                ),
              ),
            );
        }
      }),
    );
  }

  /**
   * Refreshes the subscription credits for all active Pro Plan and Premier Plan subscriptions.
   *
   * @returns {Promise<void>} - A promise indicating the success of the operation.
   */
  public async refreshSubscriptionsCredits(): Promise<void> {
    /**
     * Get all active Pro Plan subscriptions and their associated wallet IDs.
     */
    const activeProPlanSubscriptionsWalletsIds: string[] = (
      await this.prismaService.subscription.findMany({
        where: {
          isActive: true,
          OR: [
            {
              planId: this.planService.getProPlanIds().monthly,
            },
            {
              planId: this.planService.getProPlanIds().yearly,
            },
          ],
        },
        include: {
          user: {
            include: {
              wallet: true,
            },
          },
        },
      })
    ).map((subscription: Subscription) => subscription.user.wallet.id);

    /**
     * Get all active Premier Plan subscriptions and their associated wallet IDs.
     */
    const activePremierPlanSubscriptionsWalletsIds: string[] = (
      await this.prismaService.subscription.findMany({
        where: {
          isActive: true,
          OR: [
            {
              planId: this.planService.getPremierPlanIds().monthly,
            },
            {
              planId: this.planService.getPremierPlanIds().yearly,
            },
          ],
        },
        include: {
          user: {
            include: {
              wallet: true,
            },
          },
        },
      })
    ).map((subscription: Subscription) => subscription.user.wallet.id);

    /**
     * Get the number of credits given by the Pro Plan.
     */
    const proPlanCredits: number = (await this.planService.getAllPlans()).find(
      (plan: Plan) => plan.id === this.planService.getProPlanIds().monthly,
    ).credits;

    /**
     * Get the number of credits given by the Premier Plan.
     */
    const premierPlanCredits: number = (
      await this.planService.getAllPlans()
    ).find(
      (plan: Plan) => plan.id === this.planService.getPremierPlanIds().monthly,
    ).credits;

    /**
     * Set the subscription credits for all active Pro Plan and Premier Plan subscriptions.
     */
    try {
      await this.walletService.setSubscriptionCreditsToWallets(
        activeProPlanSubscriptionsWalletsIds,
        proPlanCredits,
      );

      await this.walletService.setSubscriptionCreditsToWallets(
        activePremierPlanSubscriptionsWalletsIds,
        premierPlanCredits,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while updating the subscription credits',
      );
    }
  }
}
