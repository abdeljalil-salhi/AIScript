// Dependencies
import { FC } from "react";

// Constants
import { MONTHLY_BILLING, YEARLY_BILLING } from "@/constants/pricing";
import { PricingPlan } from "@/constants/types";
import { Link } from "react-router-dom";

// Interfaces
interface SubscribeButtonProps {
  plan: PricingPlan;
  currentPlan: string;
  billingPeriod: 0 | 1;
  setBillingPeriod: (period: 0 | 1) => void;
}

/**
 * SubscribeButton Component
 *
 * @interface SubscribeButtonProps
 * @returns {JSX.Element} - SubscribeButton Component
 * @exports SubscribeButton
 */
export const SubscribeButton: FC<SubscribeButtonProps> = ({
  plan,
  currentPlan,
  billingPeriod,
  setBillingPeriod,
}): JSX.Element => {
  return currentPlan === plan.id ? (
    <div className="rounded-lg p-0.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl">
      <div className="rounded-[calc(1.5rem-1px)]">
        <span className="w-full inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-n-5 px-3.5 py-2.5 text-sm font-medium text-n-1 shadow-sm hover:bg-n-5/80 transition-all duration-300 ease-in-out cursor-pointer">
          Active
        </span>
      </div>
    </div>
  ) : (
    <div className="relative">
      <Link
        to={
          plan.id === "0"
            ? `/subscription/cancel`
            : `/checkout/${
                billingPeriod == MONTHLY_BILLING
                  ? plan.planIdMonthly
                  : plan.planIdYearly
              }`
        }
        className="w-full inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-3.5 py-2.5 text-sm font-medium text-n-1 hover:text-n-1 shadow-sm transition-all duration-300 ease-in-out cursor-pointer"
      >
        {plan.id === "0" ? "Cancel Subscription" : "Subscribe"}
      </Link>

      <div className="absolute -bottom-6 w-full flex items-center justify-center">
        <span
          className="text-transparent bg-gradient-to-br from-purple-600 hover:from-purple-600/80 to-blue-500 hover:to-blue-500/80 webkit-bg-clip-text inline-block text-sm tracking-wide cursor-pointer transition-all duration-300 ease-in-out hover:underline"
          onClick={() =>
            plan.id === "0"
              ? null
              : setBillingPeriod(
                  billingPeriod === MONTHLY_BILLING
                    ? YEARLY_BILLING
                    : MONTHLY_BILLING
                )
          }
        >
          {plan.id === "0"
            ? ""
            : billingPeriod === MONTHLY_BILLING
            ? "Save with yearly billing (20% off)"
            : "Switch to monthly billing"}
        </span>
      </div>
    </div>
  );
};
