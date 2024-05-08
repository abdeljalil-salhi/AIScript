// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { NewSubscriptionInput } from './dtos/new-subscription.input';
// Entities
import { Subscription } from './entities/subscription.entity';
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
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates a new subscription entity.
   *
   * @param {NewSubscriptionInput} newSubscriptionInput - The input data to create a new subscription.
   * @returns {Promise<Subscription>} - The newly created subscription entity.
   */
  public async createSubscription(
    newSubscriptionInput: NewSubscriptionInput,
  ): Promise<Subscription> {
    return this.prismaService.subscription.create({
      data: {
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
      include: subscriptionIncludes,
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
        userId: userId,
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
        userId: userId,
      },
    });

    return `Subscriptions for user ${userId} have been deleted`;
  }
}
