// Dependencies
import { FC } from "react";

// Constants
import {
  PaymentMethodEnum,
  cardPaymentMaintenance,
} from "@/constants/checkout";

// Interfaces
interface PaymentMethodProps {
  method: PaymentMethodEnum;
  paymentMethod: PaymentMethodEnum;
  setPaymentMethod: (method: PaymentMethodEnum) => void;
}

/**
 * Payment Method Component
 *
 * @interface PaymentMethodProps
 * @returns {JSX.Element} - Payment Method Component
 * @exports PaymentMethod
 */
export const PaymentMethod: FC<PaymentMethodProps> = ({
  method,
  paymentMethod,
  setPaymentMethod,
}): JSX.Element => {
  return method === PaymentMethodEnum.PAYPAL_PAYMENT ? (
    <div
      className={
        paymentMethod === PaymentMethodEnum.PAYPAL_PAYMENT ? "mb-5" : ""
      }
    >
      <label
        htmlFor="paypal_payment"
        className="flex items-center cursor-pointer"
      >
        <input
          type="radio"
          className="form-radio h-5 w-5 text-indigo-500"
          name="type"
          id="paypal_payment"
          checked={paymentMethod === PaymentMethodEnum.PAYPAL_PAYMENT}
          onChange={() => setPaymentMethod(PaymentMethodEnum.PAYPAL_PAYMENT)}
        />
        <img
          src="/assets/paypal_payment.svg"
          alt="PayPal Payment"
          width="80"
          className="ml-3"
          draggable={false}
        />
      </label>
    </div>
  ) : (
    <div
      className={
        paymentMethod === PaymentMethodEnum.CARD_PAYMENT &&
        cardPaymentMaintenance
          ? "mb-2"
          : ""
      }
    >
      <label
        htmlFor="card_payment"
        className={`flex items-center cursor-pointer ${
          paymentMethod === PaymentMethodEnum.CARD_PAYMENT &&
          cardPaymentMaintenance
            ? "mb-2"
            : ""
        }`}
      >
        <input
          type="radio"
          className="form-radio h-5 w-5 text-indigo-500"
          name="type"
          id="card_payment"
          checked={paymentMethod === PaymentMethodEnum.CARD_PAYMENT}
          onChange={() => setPaymentMethod(PaymentMethodEnum.CARD_PAYMENT)}
        />
        <img
          src="/assets/card_payment.png"
          alt="Card Payment"
          className="h-6 ml-3"
          draggable={false}
        />
      </label>
      {paymentMethod === PaymentMethodEnum.CARD_PAYMENT &&
        cardPaymentMaintenance && (
          <span className="text-red-500 italic text-sm">
            Card payment is currently disabled.
          </span>
        )}
    </div>
  );
};
