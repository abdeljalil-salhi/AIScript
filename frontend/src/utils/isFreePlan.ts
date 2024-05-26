import { Plan } from "@/graphql/schema.types";

export const isFreePlan = (plan: Plan | null | undefined) =>
  !plan || plan.id === import.meta.env.VITE_API_BASIC_PLAN_ID;
