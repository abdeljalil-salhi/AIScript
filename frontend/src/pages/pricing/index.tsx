// Dependencies
import { FC, useEffect, useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Helmet } from "react-helmet-async";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Constants
import { MONTHLY_BILLING, pricingPlans } from "@/constants/pricing";
import { checkoutPlans } from "@/constants/checkout";
import { CheckoutPlan, PricingPlan as TPricingPlan } from "@/constants/types";
// Components
import { BillingPeriodSwitch } from "@/components/pricing/BillingPeriodSwitch";
import { Header } from "@/components/pricing/Header";
import { PricingPlan } from "@/components/pricing/PricingPlan";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

// Interfaces
interface PricingPageProps {}

/**
 * Pricing Page Component
 *
 * @interface PricingPageProps
 * @returns {JSX.Element} - Pricing Page Component
 * @exports PricingPage
 */
export const PricingPage: FC<PricingPageProps> = (): JSX.Element => {
  useDocumentTitle("AIScript - Subscription Plans");

  /**
   * Billing Period State
   * @type {0 | 1}
   * @default MONTHLY_BILLING
   * @description 0 - Monthly Billing, 1 - Yearly Billing
   */
  const [billingPeriod, setBillingPeriod] = useState<0 | 1>(MONTHLY_BILLING);

  /**
   * Current Plan ID State
   * @type {string}
   * @default "0"
   * @description ID of the current plan
   */
  const [currentPlan, setCurrentPlan] = useState<string>("0");

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Set the current plan based on the user's subscription
   */
  useEffect(() => {
    if (!isIdentityLoading && identity) {
      const currentCheckoutPlan = checkoutPlans.find(
        (plan: CheckoutPlan) => plan.id === identity.user.subscription!.plan!.id
      );

      if (currentCheckoutPlan)
        setCurrentPlan(currentCheckoutPlan.pricingPlanId);
    }
  }, [identity, isIdentityLoading]);

  return (
    <>
      <Helmet>
        <title>AIScript - Subscription Plans</title>
        <meta
          name="description"
          content="Choose the best subscription plan for you. Get access to all the features of AIScript with ease."
        />
      </Helmet>

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
    </>
  );
};
