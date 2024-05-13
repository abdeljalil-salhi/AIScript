// Dependencies
import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";

// Constants
import { checkoutPlans } from "@/constants/checkout";
import { MONTHLY_BILLING, pricingPlans } from "@/constants/pricing";
import { CheckoutPlan, PricingPlan } from "@/constants/types";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
// Utils
import { nextBillingDateFromIdentity } from "@/utils/nextBillingDate";

// Interfaces
interface SubscriptionSummaryProps {}

/**
 * SubscriptionSummary Component
 *
 * @interface SubscriptionSummaryProps
 * @returns {JSX.Element} - SubscriptionSummary Component
 * @exports SubscriptionSummary
 */
export const SubscriptionSummary: FC<
  SubscriptionSummaryProps
> = (): JSX.Element => {
  /**
   * States to store the details of the plan
   * @type {CheckoutPlan | PricingPlan}
   */
  const [plan, setPlan] = useState<CheckoutPlan>({} as CheckoutPlan);
  const [pricingPlan, setPricingPlan] = useState({} as PricingPlan);

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Effect to set the plan and pricing plan
   * states based on the user's identity
   */
  useEffect(() => {
    if (!isIdentityLoading && identity?.user?.subscription?.plan) {
      setPlan(
        checkoutPlans.find(
          (plan: CheckoutPlan) =>
            plan.id === identity.user.subscription!.plan!.id
        ) || ({} as CheckoutPlan)
      );

      if (!plan) navigate("/subscription");

      setPricingPlan(
        pricingPlans.find(
          (pricingPlan: PricingPlan) => pricingPlan.id === plan.pricingPlanId
        ) || ({} as PricingPlan)
      );

      if (!pricingPlan) navigate("/subscription");
    }
  }, [identity, isIdentityLoading, navigate, plan, pricingPlan]);

  return (
    <div className="px-3 md:w-7/12 lg:pr-10">
      <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
        <div className="w-full flex items-center">
          <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
            <img src="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
          </div>
          <div className="flex-grow pl-3">
            <h6 className="font-semibold uppercase text-gray-600">
              {plan.name} Plan
            </h6>
            <p className="text-gray-400">
              {plan.period === MONTHLY_BILLING
                ? "Billed monthly"
                : "Billed yearly"}
            </p>
          </div>
          <div>
            <span className="font-semibold text-gray-600 text-xl">
              $
              {plan.period === MONTHLY_BILLING
                ? pricingPlan.priceMonthly
                : pricingPlan.priceYearly}
            </span>
            <span className="font-semibold text-gray-600 text-sm">.00</span>
            <span className="text-gray-400 text-sm ml-1 whitespace-nowrap">
              / {plan.period === MONTHLY_BILLING ? "month" : "year"}
            </span>
          </div>
        </div>
      </div>
      {identity?.user.subscription?.isActive ? (
        <div className="w-full mx-auto text-gray-800 font-light mb-6">
          <div className="w-full flex items-center">
            <div className="flex-grow">
              <h6 className="font-semibold uppercase text-gray-600">
                Next Billing Date
              </h6>
              <p className="text-gray-400">
                {nextBillingDateFromIdentity(identity)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto text-gray-800 font-light mb-6">
          <div className="w-full flex items-center">
            <div className="flex-grow">
              <h5 className="font-semibold uppercase text-red-500">Canceled</h5>
              <h6 className="font-semibold uppercase text-gray-600">
                Subscription Ends
              </h6>
              <p className="text-gray-400">
                {nextBillingDateFromIdentity(identity)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
