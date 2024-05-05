// Interfaces
import { PricingPlan } from "./types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "0",
    title: "Basic Plan",
    description: "For testing purposes",
    priceMonthly: 0,
    priceYearly: 0,
    priceYearlyPerMonth: 0,
    features: [
      "Free 50 credits",
      "Non-commercial terms",
      "No credit top ups",
      "Free shared generation queue",
    ],
  },
  {
    id: "1",
    title: "Pro Plan",
    description: "For small projects",
    priceMonthly: Number(import.meta.env.VITE_API_PROPLAN_MONTHLY),
    priceYearly: Number(import.meta.env.VITE_API_PROPLAN_YEARLY),
    priceYearlyPerMonth: Number(
      import.meta.env.VITE_API_PROPLAN_YEARLY_PER_MONTH
    ),
    features: [
      "500 credits renewable monthly",
      "General commercial terms",
      "Optional credit top ups",
      "Priority generation queue",
    ],
  },
  {
    id: "2",
    title: "Premier Plan",
    description: "For large projects",
    priceMonthly: Number(import.meta.env.VITE_API_PREMIERPLAN_MONTHLY),
    priceYearly: Number(import.meta.env.VITE_API_PREMIERPLAN_YEARLY),
    priceYearlyPerMonth: Number(
      import.meta.env.VITE_API_PREMIERPLAN_YEARLY_PER_MONTH
    ),
    features: [
      "1000 credits renewable monthly",
      "General commercial terms",
      "Optional credit top ups",
      "Priority generation queue",
    ],
  },
];

export const mostPopularPlanId: string = "1";

export const MONTHLY_BILLING = 0;
export const YEARLY_BILLING = 1;
