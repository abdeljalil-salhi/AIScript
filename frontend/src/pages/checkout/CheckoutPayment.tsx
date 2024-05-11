// Dependencies
import { FC, useState } from "react";

// Constants
import { PaymentMethodEnum } from "@/constants/checkout";
import { CheckoutPlan, PricingPlan } from "@/constants/types";
// Components
import { CardPayment } from "@/components/checkout/CardPayment";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { PaypalPayment } from "@/components/checkout/PaypalPayment";
import { SubscriptionDetails } from "@/components/checkout/SubscriptionDetails";

// Interfaces
interface CheckoutPaymentProps {
  plan: CheckoutPlan;
  pricingPlan: PricingPlan;
}

/**
 * CheckoutPayment Component
 *
 * @interface CheckoutPaymentProps
 * @returns {JSX.Element} - CheckoutPayment Component
 * @exports CheckoutPayment
 */
export const CheckoutPayment: FC<CheckoutPaymentProps> = ({
  plan,
  pricingPlan,
}): JSX.Element => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(
    PaymentMethodEnum.PAYPAL_PAYMENT
  );

  return (
    <div className="px-3 md:w-5/12">
      <SubscriptionDetails plan={plan} />

      <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
        <div
          className={`w-full p-3${
            paymentMethod === PaymentMethodEnum.PAYPAL_PAYMENT ? " pb-0" : ""
          }`}
        >
          <PaymentMethod
            method={PaymentMethodEnum.PAYPAL_PAYMENT}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          {paymentMethod === PaymentMethodEnum.PAYPAL_PAYMENT && (
            <PaypalPayment plan={plan} pricingPlan={pricingPlan} />
          )}
        </div>

        <div className="w-full p-3 border-t border-gray-200">
          <PaymentMethod
            method={PaymentMethodEnum.CARD_PAYMENT}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          {paymentMethod === PaymentMethodEnum.CARD_PAYMENT && <CardPayment />}
        </div>
      </div>

      <div className="text-sm text-gray-400 mt-3">
        By confirming your subscription, you allow AIScript to charge you for
        future payments in accordance with their terms. You can always cancel
        your subscription.
      </div>
    </div>
  );
};
