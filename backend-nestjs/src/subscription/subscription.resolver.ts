// Dependencies
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Services
import { SubscriptionService } from './subscription.service';
// DTOs
import { NewSubscriptionInput } from './dtos/new-subscription.input';
// Entities
import { Subscription } from './entities/subscription.entity';
// Decorators
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

/**
 * The subscription resolver that encapsulates all subscription-related GraphQL queries and mutations.
 *
 * @export
 * @class SubscriptionResolver
 * @module SubscriptionModule
 */
@Resolver()
export class SubscriptionResolver {
  /**
   * Creates an instance of the SubscriptionResolver class.
   *
   * @param {SubscriptionService} subscriptionService - The SubscriptionService instance for handling subscription operations.
   */
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Mutation to create a new subscription entity.
   *
   * @mutation
   * @param {NewSubscriptionInput} newSubscriptionInput - The input data to create a new subscription.
   * @returns {Promise<Subscription>} - The newly created subscription entity.
   */
  @Mutation(() => Subscription, {
    name: 'createSubscription',
    description: 'Creates a new subscription entity.',
  })
  public async createSubscription(
    @Args('newSubscriptionInput') newSubscriptionInput: NewSubscriptionInput,
  ): Promise<Subscription> {
    return this.subscriptionService.createSubscription(newSubscriptionInput);
  }

  /**
   * Mutation to cancel a subscription entity.
   *
   * @mutation
   * @param {string} subscriptionId - The ID of the subscription entity to cancel.
   * @returns {Promise<Subscription>} - The cancelled subscription entity.
   * @throws {NotFoundException} - If the subscription is not found.
   */
  @Mutation(() => Subscription, {
    name: 'cancelSubscription',
    description: 'Cancels a subscription entity by ID.',
  })
  public async cancelSubscription(
    @Args('subscriptionId', { type: () => String }) subscriptionId: string,
  ): Promise<Subscription> {
    const subscription: Subscription =
      await this.subscriptionService.getSubscriptionById(subscriptionId);

    if (!subscription) throw new NotFoundException('Subscription not found');

    return this.subscriptionService.cancelSubscription(subscriptionId);
  }

  /**
   * Query to retrieve all subscription entities.
   *
   * @query
   * @returns {Promise<Subscription[]>} - The list of subscription entities.
   */
  @Query(() => [Subscription], {
    name: 'getAllSubscriptions',
    description: 'Retrieves all subscription entities.',
  })
  public async getAllSubscriptions(): Promise<Subscription[]> {
    return this.subscriptionService.getAllSubscriptions();
  }

  /**
   * Query to retrieve a single subscription entity by ID.
   *
   * @query
   * @param {string} subscriptionId - The ID of the subscription entity to retrieve.
   * @returns {Promise<Subscription>} - The subscription entity with the specified ID.
   */
  @Query(() => Subscription, {
    name: 'getSubscriptionById',
    description: 'Retrieves a single subscription entity by ID.',
  })
  public async getSubscriptionById(
    @Args('subscriptionId', { type: () => String }) subscriptionId: string,
  ): Promise<Subscription> {
    const subscription: Subscription =
      await this.subscriptionService.getSubscriptionById(subscriptionId);

    if (!subscription) throw new NotFoundException('Subscription not found');

    return subscription;
  }

  /**
   * Query to retrieve all subscription entities for a specific user.
   *
   * @query
   * @param {string} userId - The ID of the user to retrieve subscriptions for.
   * @returns {Promise<Subscription[]>} - The list of subscription entities for the specified user.
   */
  @Query(() => [Subscription], {
    name: 'getSubscriptionsByUserId',
    description: 'Retrieves all subscription entities for a specific user.',
  })
  public async getSubscriptionsByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Subscription[]> {
    return this.subscriptionService.getSubscriptionsByUserId(userId);
  }

  /**
   * Query to retrieve all subscription entities for a specific plan.
   *
   * @query
   * @param {string} planId - The ID of the plan to retrieve subscriptions for.
   * @returns {Promise<Subscription[]>} - The list of subscription entities for the specified plan.
   */
  @Query(() => [Subscription], {
    name: 'getSubscriptionsByPlanId',
    description: 'Retrieves all subscription entities for a specific plan.',
  })
  public async getSubscriptionsByPlanId(
    @Args('planId', { type: () => String }) planId: string,
  ): Promise<Subscription[]> {
    return this.subscriptionService.getSubscriptionsByPlanId(planId);
  }

  /**
   * Mutation to delete a subscription entity by ID.
   *
   * @mutation
   * @param {string} subscriptionId - The ID of the subscription entity to delete.
   * @returns {Promise<Subscription>} - The deleted subscription entity.
   * @throws {NotFoundException} - If the subscription is not found.
   */
  @Mutation(() => Subscription, {
    name: 'deleteSubscriptionById',
    description: 'Deletes a subscription entity by ID.',
  })
  public async deleteSubscriptionById(
    @Args('subscriptionId', { type: () => String }) subscriptionId: string,
  ): Promise<Subscription> {
    const subscription: Subscription =
      await this.subscriptionService.getSubscriptionById(subscriptionId);

    if (!subscription) throw new NotFoundException('Subscription not found');

    return this.subscriptionService.deleteSubscriptionById(subscriptionId);
  }

  /**
   * Mutation to delete all subscription entities for a specific user.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @param {string} userId - The ID of the user to delete subscriptions for.
   * @returns {Promise<string>} - A message indicating the success of the operation.
   * @throws {ForbiddenException} - If the user is not authorized to delete subscriptions.
   */
  @Mutation(() => [Subscription], {
    name: 'deleteSubscriptionsByUserId',
    description: 'Deletes all subscription entities for a specific user.',
  })
  public async deleteSubscriptionsByUserId(
    @CurrentUser('isAdmin') isAdmin: boolean,
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<string> {
    if (!isAdmin)
      throw new ForbiddenException(
        'User not authorized to delete subscriptions',
      );

    return this.subscriptionService.deleteSubscriptionsByUserId(userId);
  }

  /**
   * Mutation to validate all subscriptions.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @returns {Promise<string>} - A message indicating the success of the operation.
   * @throws {ForbiddenException} - If the user is not authorized to validate subscriptions.
   */
  @Mutation(() => String, {
    name: 'validateSubscriptions',
    description: 'Validates all subscriptions.',
  })
  public async validateSubscriptions(
    @CurrentUser('isAdmin') isAdmin: boolean,
  ): Promise<string> {
    if (!isAdmin)
      throw new ForbiddenException(
        'User not authorized to validate subscriptions',
      );

    await this.subscriptionService.validateSubscriptions();

    return 'Subscriptions validated successfully';
  }

  /**
   * Mutation to refresh all subscriptions credits.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @returns {Promise<string>} - A message indicating the success of the operation.
   * @throws {ForbiddenException} - If the user is not authorized to refresh subscriptions credits.
   */
  @Mutation(() => String, {
    name: 'refreshSubscriptionsCredits',
    description: 'Refreshes all subscriptions credits.',
  })
  public async refreshSubscriptionsCredits(
    @CurrentUser('isAdmin') isAdmin: boolean,
  ): Promise<string> {
    if (!isAdmin)
      throw new ForbiddenException(
        'User not authorized to refresh subscriptions credits',
      );

    await this.subscriptionService.refreshSubscriptionsCredits();

    return 'Subscriptions credits refreshed successfully';
  }
}
