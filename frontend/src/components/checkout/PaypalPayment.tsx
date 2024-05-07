// Dependencies
import { FC, useEffect } from "react";
import { CreateSubscriptionActions, OnApproveActions } from "@paypal/paypal-js";

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
  useEffect(() => {
    const renderPayPalButton = () => {
      if (window.paypal && window.paypal.Buttons) {
        const paypalButton: HTMLElement | null =
          document.getElementById("paypal-checkout");
        if (!paypalButton) return;

        paypalButton.innerHTML = "";

        window.paypal
          .Buttons({
            style: {
              shape: "pill",
              color: "blue",
              layout: "vertical",
              label: "subscribe",
            },
            createSubscription: function (
              _,
              actions: CreateSubscriptionActions
            ) {
              return actions.subscription.create({
                /* Creates the subscription */
                plan_id: plan.planId,
              });
            },
            onApprove: async function (_, actions: OnApproveActions) {
              actions.subscription?.activate().then(function () {
                window.location.href = "/success";
              });
            },
            onError: function (err) {
              console.error(err);
            },
          })
          .render("#paypal-checkout");
      }
    };

    renderPayPalButton();
  }, [plan.planId]);

  return (
    <div>
      <div id="paypal-checkout"></div>
    </div>
  );
};
