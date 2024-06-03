// Dependencies
import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGetIdentity } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Constants
import { checkoutPlans } from "@/constants/checkout";
import { pricingPlans } from "@/constants/pricing";
import { CheckoutPlan, PricingPlan } from "@/constants/types";
// Pages
import { LoadingPage } from "../loading";
// Components
import { CheckoutSummary } from "./CheckoutSummary";
import { Header } from "@/components/checkout/Header";
import { CheckoutPayment } from "./CheckoutPayment";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

// Interfaces
interface CheckoutPageProps {}

interface CheckoutPageParams {
  // Plan ID from the URL
  planId: string;
  // Allow for other params
  [key: string]: string | undefined;
}

/**
 * Checkout Page Component
 *
 * @interface CheckoutPageProps
 * @returns {JSX.Element} - Checkout Page Component
 * @exports CheckoutPage
 */
export const CheckoutPage: FC<CheckoutPageProps> = (): JSX.Element => {
  /**
   * Plan state for the checkout page based on the plan ID from the URL
   */
  const [plan, setPlan] = useState<CheckoutPlan>({} as CheckoutPlan);
  const [pricingPlan, setPricingPlan] = useState<PricingPlan>(
    {} as PricingPlan
  );

  /**
   * Loading state for the checkout page
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Get the plan ID from the URL
   */
  const { planId }: Readonly<Partial<CheckoutPageParams>> =
    useParams<CheckoutPageParams>();

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Effect to set the plan and pricing plan states based on the plan ID
   * from the URL
   */
  useEffect(() => {
    setIsLoading(true);

    if (isIdentityLoading) return;

    if (identity?.user.subscription?.plan) {
      // Get the plan from the list of checkout plans
      const selectedPlan = checkoutPlans.find(
        (p: CheckoutPlan) => p.id === planId
      );

      // Set the plan and pricing plan states if the plan is found
      if (selectedPlan) {
        setPlan(selectedPlan);
        setPricingPlan(
          pricingPlans.find(
            (p: PricingPlan) => p.id === selectedPlan.pricingPlanId
          ) as PricingPlan
        );

        if (plan.id === identity.user.subscription.plan.id)
          navigate("/pricing");

        setIsLoading(false);
      }
      // Redirect to pricing page if plan is not found
      else navigate("/pricing");
    }
  }, [
    identity?.user.subscription?.plan,
    isIdentityLoading,
    navigate,
    plan,
    planId,
  ]);

  useDocumentTitle(`AIScript - Subscribe${plan ? ` to ${plan.name}` : ""}`);

  return (
    <>
      <Helmet>
        <title>AIScript - Subscribe{plan ? ` to ${plan.name}` : ""}</title>
        <meta
          name="description"
          content="Complete your purchase and start your journey with AIScript."
        />
      </Helmet>

      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="w-full min-h-screen bg-gray-50 py-5 font-['Poppins'] flex flex-col items-center">
          <Header plan={plan} />

          <div className="w-full bg-white border-t border-b xl:border xl:rounded-md border-gray-200 px-5 py-10 text-gray-800 flex items-center justify-center max-w-7xl mx-auto">
            <div className="w-full max-w-7xl">
              <div className="-mx-3 md:flex items-start">
                <CheckoutSummary plan={plan} pricingPlan={pricingPlan} />

                <CheckoutPayment plan={plan} pricingPlan={pricingPlan} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
