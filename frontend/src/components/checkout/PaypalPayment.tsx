// Dependencies
import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";

// Constants
import { CheckoutPlan } from "@/constants/types";

// Interfaces
interface PaypalPaymentProps {
  plan: CheckoutPlan;
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

  const styles: PayPalButtonsComponentProps["style"] = {
    shape: "pill",
    color: "blue",
    layout: "vertical",
    label: "subscribe",
  };

  const createSubscription: PayPalButtonsComponentProps["createSubscription"] =
    (_, actions) => {
      return actions.subscription.create({
        plan_id: plan.planId,
      });
    };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
    navigate(`/checkout/success/${data.orderID}`, {
      state: {
        ...data,
        plan,
      },
    });
  };

  const onCancel: PayPalButtonsComponentProps["onCancel"] = (data) => {
    navigate(`/checkout/cancel/${data.orderID}`);
  };

  const onError: PayPalButtonsComponentProps["onError"] = () => {
    setShowError(true);
  };

  return (
    <div>
      <PayPalButtons
        style={styles}
        createSubscription={createSubscription}
        onApprove={onApprove}
        onCancel={onCancel}
        onError={onError}
        forceReRender={[plan.planId]}
      />
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
