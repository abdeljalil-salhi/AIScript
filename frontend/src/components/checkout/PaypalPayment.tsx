// Dependencies
import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { useCustomMutation, useGetIdentity } from "@refinedev/core";

// Constants
import { MONTHLY_BILLING } from "@/constants/pricing";
import { CheckoutPlan, PricingPlan } from "@/constants/types";
// Providers
import { API_URL } from "@/providers";
// GraphQL Mutations
import { MUTATION_SUBSCRIBE } from "@/graphql/mutations/subscribe";
// GraphQL Types
import { SubscribeMutation } from "@/graphql/types";
import { MeResponse } from "@/graphql/schema.types";

// Interfaces
interface PaypalPaymentProps {
  plan: CheckoutPlan;
  pricingPlan: PricingPlan;
}

/**
 * Paypal Payment Component
 *
 * @interface PaypalPaymentProps
 * @returns {JSX.Element} - Paypal Payment Component
 * @exports PaypalPayment
 */
export const PaypalPayment: FC<PaypalPaymentProps> = ({
  plan,
  pricingPlan,
}): JSX.Element => {
  /**
   * Error state for the Paypal Payment component
   * @type {boolean}
   * @default false
   */
  const [showError, setShowError] = useState<boolean>(false);

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Subscribe mutation to subscribe the user to the plan
   * @type {useCustomMutation}
   */
  const {
    mutate: subscribe,
    isLoading: isSubscribing,
    isError: subscribeError,
  } = useCustomMutation<SubscribeMutation>();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Styles for the Paypal Buttons
   * @type {PayPalButtonsComponentProps["style"]}
   */
  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "pill",
    color: "blue",
    layout: "vertical",
    label: "subscribe",
  };

  /**
   * Create subscription function for the Paypal Buttons
   * @type {PayPalButtonsComponentProps["createSubscription"]}
   */
  const createSubscription: PayPalButtonsComponentProps["createSubscription"] =
    (_, actions) => {
      if (identity?.user.subscription?.payment?.paypalSubId)
        return actions.subscription.revise(
          identity.user.subscription.payment.paypalSubId,
          {
            plan_id: plan.planId,
          }
        );

      return actions.subscription.create({
        plan_id: plan.planId,
      });
    };

  /**
   * On Approve function for the Paypal Buttons;
   * Call the subscribe mutation to subscribe the user to the plan
   * and navigate to the success page, if successful
   * @type {PayPalButtonsComponentProps["onApprove"]}
   */
  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    subscribe({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_SUBSCRIBE,
        variables: {
          subscribeInput: {
            userId: identity?.user.id,
            planId: plan.id,
            amount:
              plan.period === MONTHLY_BILLING
                ? pricingPlan.priceMonthly
                : pricingPlan.priceYearly,
            orderId: data.orderID,
            paypalSubId: data.subscriptionID,
            paymentSource: "PayPal",
            facilitatorAccessToken: data.facilitatorAccessToken,
          },
        },
      },
      values: {},
    });

    if (subscribeError) {
      setShowError(true);
      return;
    }

    navigate(`/checkout/success/${data.orderID}`, {
      state: {
        ...data,
        plan,
      },
    });
  };

  /**
   * On Cancel function for the Paypal Buttons;
   * Navigate to the cancel page
   * @type {PayPalButtonsComponentProps["onCancel"]}
   */
  const onCancel: PayPalButtonsComponentProps["onCancel"] = (data) => {
    navigate(`/checkout/cancel/${data.orderID}`);
  };

  /**
   * On Error function for the Paypal Buttons;
   * Set the error state to true to show the error message
   * @type {PayPalButtonsComponentProps["onError"]}
   */
  const onError: PayPalButtonsComponentProps["onError"] = () => {
    setShowError(true);
  };

  return (
    <div>
      {isSubscribing || isIdentityLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PayPalButtons
          style={styles}
          createSubscription={createSubscription}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
          forceReRender={[plan.planId]}
        />
      )}
      {showError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
          <strong className="font-bold mr-1">Holy smokes!</strong>
          <span className="block sm:inline">
            Something bad happened, retry.
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowError(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};
