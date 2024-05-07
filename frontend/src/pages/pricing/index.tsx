// Dependencies
import { FC, useState } from "react";

// Constants
import { MONTHLY_BILLING, pricingPlans } from "@/constants/pricing";
import { PricingPlan as TPricingPlan } from "@/constants/types";
// Components
import { BillingPeriodSwitch } from "@/components/pricing/BillingPeriodSwitch";
import { Header } from "@/components/pricing/Header";
import { PricingPlan } from "@/components/pricing/PricingPlan";

// Interfaces
interface PricingPageProps {}

const currentPlan: string = "0";

/**
 * Pricing Page Component
 *
 * @interface PricingPageProps
 * @returns {JSX.Element} - Pricing Page Component
 * @exports PricingPage
 */
export const PricingPage: FC<PricingPageProps> = (): JSX.Element => {
  /**
   * Billing Period State
   * @type {0 | 1}
   * @default MONTHLY_BILLING
   * @description 0 - Monthly Billing, 1 - Yearly Billing
   */
  const [billingPeriod, setBillingPeriod] = useState<0 | 1>(MONTHLY_BILLING);

  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      <Header />

      <BillingPeriodSwitch
        billingPeriod={billingPeriod}
        setBillingPeriod={setBillingPeriod}
      />

      <div className="max-w-6xl md:mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {pricingPlans.map((plan: TPricingPlan) => (
          <PricingPlan
            key={plan.id}
            plan={plan}
            currentPlan={currentPlan}
            billingPeriod={billingPeriod}
            setBillingPeriod={setBillingPeriod}
          />
        ))}
      </div>

      <div className="w-full"></div>
    </div>
  );
};
