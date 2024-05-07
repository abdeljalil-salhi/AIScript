// Dependencies
import { FC } from "react";

// Constants
import { MONTHLY_BILLING } from "@/constants/pricing";
import { CheckoutPlan } from "@/constants/types";

// Interfaces
interface SubscriptionDetailsProps {
  plan: CheckoutPlan;
}

/**
 * Subscription Details Component
 *
 * @interface SubscriptionDetailsProps
 * @returns {JSX.Element} - Subscription Details Component
 * @exports SubscriptionDetails
 */
export const SubscriptionDetails: FC<SubscriptionDetailsProps> = ({
  plan,
}): JSX.Element => {
  return (
    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
      <div className="w-full flex mb-3 items-center">
        <div className="w-32">
          <span className="text-gray-600 font-semibold text-nowrap">
            Subscription
          </span>
        </div>
        <div className="flex-grow pl-3">
          <span>{plan.name}</span>
        </div>
      </div>
      <div className="w-full flex items-center">
        <div className="w-32">
          <span className="text-gray-600 font-semibold text-nowrap">
            Next billing date
          </span>
        </div>
        <div className="flex-grow pl-3">
          <span>
            {new Date(
              plan.period === MONTHLY_BILLING
                ? new Date().setMonth(new Date().getMonth() + 1)
                : new Date().setFullYear(new Date().getFullYear() + 1)
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
