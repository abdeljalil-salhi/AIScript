// Dependencies
import { FC } from "react";

// Constants
import { mostPopularPlanId } from "@/constants/pricing";
import { PricingPlan as TPricingPlan } from "@/constants/types";
// Components
import { MostPopularTag } from "./MostPopularTag";
import { SubscribeButton } from "./SubscribeButton";
import { PlanFeature } from "./PlanFeature";
import { Price } from "./Price";

// Interfaces
interface PricingPlanProps {
  plan: TPricingPlan;
  currentPlan: string;
  billingPeriod: 0 | 1;
  setBillingPeriod: (period: 0 | 1) => void;
}

/**
 * Pricing Plan Component
 *
 * @interface PricingPlanProps
 * @returns {JSX.Element} - Pricing Plan Component
 * @exports PricingPlan
 */
export const PricingPlan: FC<PricingPlanProps> = ({
  plan,
  currentPlan,
  billingPeriod,
  setBillingPeriod,
}): JSX.Element => {
  return (
    <div
      key={plan.id}
      className="relative flex flex-col h-full p-6 rounded-2xl shadow-md bg-n-7 border border-n-6/70 lg:odd:my-4 2xl:min-w-96"
    >
      {mostPopularPlanId === plan.id && <MostPopularTag />}

      <div className="mb-10">
        <div className="text-n-1 text-xl font-semibold mb-1 tracking-wide">
          {plan.title}
        </div>

        <Price plan={plan} billingPeriod={billingPeriod} />

        <div className="text-n-4 text-sm mb-10">{plan.description}</div>

        <SubscribeButton
          plan={plan}
          currentPlan={currentPlan}
          billingPeriod={billingPeriod}
          setBillingPeriod={setBillingPeriod}
        />
      </div>

      <hr className="border border-n-6/90 w-full h-px opacity-50" />

      <ul className="flex flex-col gap-4 mt-5">
        {plan.features.map((feature: string, index: number) => (
          <PlanFeature key={index} feature={feature} />
        ))}
      </ul>
    </div>
  );
};
