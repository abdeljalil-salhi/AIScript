// Dependencies
import { FC } from "react";

// Constants
import { PricingPlan } from "@/constants/types";
import { MONTHLY_BILLING } from "@/constants/pricing";

// Interfaces
interface PriceProps {
  plan: PricingPlan;
  billingPeriod: 0 | 1;
}

/**
 * Price Component
 *
 * @interface PriceProps
 * @returns {JSX.Element} - Price Component
 * @exports Price
 */
export const Price: FC<PriceProps> = ({ plan, billingPeriod }): JSX.Element => {
  return (
    <div className="inline-flex items-baseline mb-2">
      <span className="text-n-1 text-3xl font-semibold">$</span>
      <span className="text-n-1 text-4xl font-semibold">
        {billingPeriod === MONTHLY_BILLING
          ? plan.priceMonthly
          : plan.priceYearlyPerMonth}
      </span>
      <span className="text-n-4 text-base font-normal ml-1.5">
        {billingPeriod === MONTHLY_BILLING
          ? plan.priceMonthly === 0
            ? "Free"
            : "/ month"
          : plan.priceYearlyPerMonth === 0
          ? "Free"
          : "/ month"}
      </span>
    </div>
  );
};
