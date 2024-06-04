// GraphQL Types
import { Plan } from "@/graphql/schema.types";

/**
 * Check if a plan is a free plan.
 *
 * @param {Plan | null | undefined } plan - The plan to check
 * @returns {boolean} - True if the plan is free, false otherwise
 */
export const isFreePlan = (plan: Plan | null | undefined) =>
  !plan || plan.id === import.meta.env.VITE_API_BASIC_PLAN_ID;
