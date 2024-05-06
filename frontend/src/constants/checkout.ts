// Dependencies
import { v4 as uuidv4 } from "uuid";

// Interfaces
import { CheckoutPlan } from "./types";

const MONTHLY_BILLING = 0;
const YEARLY_BILLING = 1;

export const basicPlanId: string = uuidv4();
export const monthlyProPlanId: string = uuidv4();
export const yearlyProPlanId: string = uuidv4();
export const monthlyPremierPlanId: string = uuidv4();
export const yearlyPremierPlanId: string = uuidv4();

export const cardPaymentMaintenance: boolean =
  String(import.meta.env.VITE_API_CARD_PAYMENT_MAINTENANCE)
    .trim()
    .toLowerCase() === "true";

export const checkoutPlans: CheckoutPlan[] = [
  {
    id: basicPlanId,
    name: "AIScript Basic",
    planId: "",
    pricingPlanId: "0",
    period: MONTHLY_BILLING,
  },
  {
    id: monthlyProPlanId,
    name: "AIScript Pro",
    planId: import.meta.env.VITE_API_PROPLAN_MONTHLY_PLAN_ID,
    pricingPlanId: "1",
    period: MONTHLY_BILLING,
  },
  {
    id: yearlyProPlanId,
    name: "AIScript Pro",
    planId: import.meta.env.VITE_API_PROPLAN_YEARLY_PLAN_ID,
    pricingPlanId: "1",
    period: YEARLY_BILLING,
  },
  {
    id: monthlyPremierPlanId,
    name: "AIScript Premier",
    planId: import.meta.env.VITE_API_PREMIERPLAN_MONTHLY_PLAN_ID,
    pricingPlanId: "2",
    period: MONTHLY_BILLING,
  },
  {
    id: yearlyPremierPlanId,
    name: "AIScript Premier",
    planId: import.meta.env.VITE_API_PREMIERPLAN_YEARLY_PLAN_ID,
    pricingPlanId: "2",
    period: YEARLY_BILLING,
  },
];
