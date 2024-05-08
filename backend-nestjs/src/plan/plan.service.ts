// Dependencies
import { Injectable, OnModuleInit } from '@nestjs/common';

// Constants
import { plans } from 'src/constants/plans';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// Entities
import { Plan } from './entities/plan.entity';

/**
 * Service for handling plan-related operations.
 *
 * @export
 * @class PlanService
 * @implements {OnModuleInit} - Lifecycle hook that is executed when the module is initialized.
 * @module PlanModule
 */
@Injectable()
export class PlanService implements OnModuleInit {
  /**
   * Creates an instance of the PlanService class.
   *
   * @param {PrismaService} prismaService - The Prisma service for database operations.
   */
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * A list of all created plans.
   * @type {Plan[]}
   */
  private createdPlans: Plan[] = [];

  /**
   * Method called when the module is initialized.
   * This is used to create the plans when the application is started.
   *
   * @returns {Promise<void>} - A Promise that resolves when the module is initialized.
   */
  public async onModuleInit(): Promise<void> {
    await this.createPlans();
  }

  /**
   * Creates plans by adding them to the database.
   *
   * @returns {Promise<Plan[]>} - A list of created plans.
   */
  public async createPlans(): Promise<Plan[]> {
    /**
     * Creates plans by adding them to the database.
     * If a plan already exists, it will be skipped.
     * This is done to prevent duplicate plans from being created.
     */
    await this.prismaService.plan.createMany({
      data: plans,
      skipDuplicates: true,
    });

    /**
     * Retrieves all plans from the database.
     * This is done to return the plans with their IDs.
     */
    this.createdPlans = await this.getAllPlans();

    return this.createdPlans;
  }

  /**
   * Retrieves all plans from the database.
   *
   * @returns {Promise<Plan[]>} - A list of all plans.
   */
  public async getAllPlans(): Promise<Plan[]> {
    return this.prismaService.plan.findMany();
  }

  /**
   * Retrieves a plan by its ID.
   *
   * @param {string} id - The ID of the plan to retrieve.
   * @returns {Promise<Plan>} - The plan with the specified ID.
   */
  public async getPlanById(id: string): Promise<Plan> {
    return this.prismaService.plan.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Updates a plan by its ID.
   * The data parameter contains the fields to update.
   * Only the fields that need to be updated should be provided.
   *
   * @param {string} id - The ID of the plan to update.
   * @param {Partial<Plan>} data - The data to update the plan with.
   * @returns {Promise<Plan>} - The updated plan.
   */
  public async updatePlan(id: string, data: Partial<Plan>): Promise<Plan> {
    return this.prismaService.plan.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  /**
   * Deletes a plan by its ID.
   *
   * @param {string} id - The ID of the plan to delete.
   * @returns {Promise<Plan>} - The deleted plan.
   */
  public async deletePlan(id: string): Promise<Plan> {
    return this.prismaService.plan.delete({
      where: {
        id,
      },
    });
  }

  /**
   * Deletes all plans from the database.
   *
   * @returns {Promise<void>} - A Promise that resolves when all plans are deleted.
   */
  public async deleteAllPlans(): Promise<void> {
    await this.prismaService.plan.deleteMany();
  }
}
