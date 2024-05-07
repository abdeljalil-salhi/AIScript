// Dependencies
import { FC } from "react";
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
    console.log(data);
    // {
    //     "orderID": "8MR04774TD9366647",
    //     "subscriptionID": "I-YRW4FCXUDRL6",
    //     "facilitatorAccessToken": "A21AAJazRPKlsQTRTnGq76sBvxIrEV9yZf14sSUtCZh8r2xc4zGYHPcSdtfmh9Xz7rI1hhNWx6mzy1MN6_bWOCGgxcQ5N9GRQ",
    //     "paymentSource": "paypal"
    // }
    alert(`You have successfully subscribed to ${data.subscriptionID}`);
  };

  const onCancel: PayPalButtonsComponentProps["onCancel"] = (data) => {
    console.log(data);
    alert("Subscription has been cancelled");
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
