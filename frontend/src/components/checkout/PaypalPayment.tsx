// Dependencies
import { FC } from "react";
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

  const onError: PayPalButtonsComponentProps["onError"] = (err) => {
    console.log(err);
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
    </div>
  );
};
