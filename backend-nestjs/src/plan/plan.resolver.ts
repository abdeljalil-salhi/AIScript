// Dependencies
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

// Services
import { PlanService } from './plan.service';
// DTOs
import { UpdatePlanInput } from './dtos/update-plan.input';
// Entities
import { Plan } from './entities/plan.entity';
// Decorators
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

/**
 * The plan resolver that encapsulates all plan-related GraphQL queries and mutations.
 *
 * @export
 * @class PlanResolver
 * @module PlanModule
 */
@Resolver()
export class PlanResolver {
  /**
   * Creates an instance of the PlanResolver class.
   *
   * @param {PlanService} planService - The PlanService instance for handling plan operations.
   */
  constructor(private readonly planService: PlanService) {}

  /**
   * Mutation to create the predefined plans in the database.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @returns {Promise<Plan[]>} - A list of created plans.
   * @throws {ForbiddenException} - If the user is not authorized to create plans.
   */
  @Mutation(() => [Plan], {
    name: 'createPlans',
    description: 'Creates the predefined plans in the database.',
  })
  public async createPlans(
    @CurrentUser('isAdmin') isAdmin: boolean,
  ): Promise<Plan[]> {
    if (!isAdmin)
      throw new ForbiddenException('User not authorized to create plans');

    return this.planService.createPlans();
  }

  /**
   * Query to get all the available plans.
   *
   * @query
   * @returns {Promise<Plan[]>} - A list of all available plans.
   */
  @Query(() => [Plan], {
    name: 'getAllPlans',
    description: 'Gets all the available plans.',
  })
  public async getAllPlans(): Promise<Plan[]> {
    return this.planService.getAllPlans();
  }

  /**
   * Query to get a plan by its ID.
   *
   * @query
   * @param {string} planId - The ID of the plan to retrieve.
   * @returns {Promise<Plan>} - The plan with the specified ID.
   * @throws {NotFoundException} - If the plan is not found.
   */
  @Query(() => Plan, {
    name: 'getPlanById',
    description: 'Gets a plan by its ID.',
  })
  public async getPlanById(
    @Args('planId', { type: () => String }) planId: string,
  ): Promise<Plan> {
    const plan: Plan = await this.planService.getPlanById(planId);

    if (!plan) throw new NotFoundException('Plan not found');

    return plan;
  }

  /**
   * Mutation to update a plan by its ID.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @param {string} planId - The ID of the plan to update.
   * @param {updatePlanInput} updatePlanInput - The input data to update the plan.
   * @returns {Promise<Plan>} - The updated plan.
   * @throws {ForbiddenException} - If the user is not authorized to update plans.
   */
  @Mutation(() => Plan, {
    name: 'updatePlan',
    description: 'Updates a plan by its ID.',
  })
  public async updatePlan(
    @CurrentUser('isAdmin') isAdmin: boolean,
    @Args('planId', { type: () => String }) planId: string,
    @Args('updatePlanInput') updatePlanInput: UpdatePlanInput,
  ): Promise<Plan> {
    if (!isAdmin)
      throw new ForbiddenException('User not authorized to update plans');

    return this.planService.updatePlan(planId, updatePlanInput);
  }

  /**
   * Mutation to delete a plan by its ID.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @param {string} planId - The ID of the plan to delete.
   * @returns {Promise<Plan>} - The deleted plan.
   * @throws {ForbiddenException} - If the user is not authorized to delete plans.
   * @throws {NotFoundException} - If the plan is not found.
   */
  @Mutation(() => Plan, {
    name: 'deletePlan',
    description: 'Deletes a plan by its ID.',
  })
  public async deletePlan(
    @CurrentUser('isAdmin') isAdmin: boolean,
    @Args('planId', { type: () => String }) planId: string,
  ): Promise<Plan> {
    if (!isAdmin)
      throw new ForbiddenException('User not authorized to delete plans');

    const plan: Plan = await this.planService.getPlanById(planId);

    if (!plan) throw new NotFoundException('Plan not found');

    return this.planService.deletePlan(planId);
  }

  /**
   * Mutation to delete all plans from the database.
   * This mutation is restricted to admin users only.
   *
   * @mutation
   * @param {boolean} isAdmin - A boolean flag indicating if the user is an admin.
   * @returns {Promise<string>} - A message indicating the deletion of all plans.
   * @throws {ForbiddenException} - If the user is not authorized to delete plans.
   */
  @Mutation(() => [Plan], {
    name: 'deleteAllPlans',
    description: 'Deletes all plans from the database.',
  })
  public async deleteAllPlans(
    @CurrentUser('isAdmin') isAdmin: boolean,
  ): Promise<string> {
    if (!isAdmin)
      throw new ForbiddenException('User not authorized to delete plans');

    await this.planService.deleteAllPlans();

    return 'All plans deleted successfully';
  }
}
