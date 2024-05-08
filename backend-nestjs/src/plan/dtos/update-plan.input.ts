// Dependencies
import { InputType, Field, Int } from '@nestjs/graphql';

/**
 * Input type to update a plan;
 * This is used as input to the `updatePlan` mutation.
 *
 * @export
 * @class UpdatePlanInput
 * @module PlanModule
 */
@InputType()
export class UpdatePlanInput {
  /**
   * Name of the plan
   * @type {string}
   */
  @Field(() => String, {
    description: 'Plan name',
    nullable: true,
  })
  public name?: string;

  /**
   * Description of the plan
   * @type {string}
   */
  @Field(() => String, {
    description: 'Plan description',
    nullable: true,
  })
  public description?: string;

  /**
   * Price of the plan
   * @type {number}
   */
  @Field(() => Int, {
    description: 'Plan price',
    nullable: true,
  })
  public price?: number;

  /**
   * Duration of the plan
   * In days; 0 means basic plan, 30 means monthly plan, 365 means yearly plan
   * @type {number}
   */
  @Field(() => Int, {
    description: 'Plan duration',
    nullable: true,
  })
  public duration?: number;
}
