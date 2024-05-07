// Dependencies
import { FC } from "react";

// Constants
import { MONTHLY_BILLING } from "@/constants/pricing";
import { CheckoutPlan, PricingPlan } from "@/constants/types";

// Interfaces
interface CheckoutSummaryProps {
  plan: CheckoutPlan;
  pricingPlan: PricingPlan;
}

/**
 * Checkout Summary Component
 *
 * @interface CheckoutSummaryProps
 * @returns {JSX.Element} - Checkout Summary Component
 * @exports CheckoutSummary
 */
export const CheckoutSummary: FC<CheckoutSummaryProps> = ({
  plan,
  pricingPlan,
}): JSX.Element => {
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
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="-mx-2 flex items-end justify-end">
          <div className="flex-grow px-2 lg:max-w-xs">
            <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
              Discount code
            </label>
            <div>
              <input
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-gray-200/30"
                placeholder="XXXXXX"
                type="text"
              />
            </div>
          </div>
          <div className="px-2">
            <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold transition-all ease-in-out duration-300">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
        <div className="w-full flex mb-3 items-center">
          <div className="flex-grow">
            <span className="text-gray-600">Subtotal</span>
          </div>
          <div className="pl-3">
            <span className="font-semibold">
              $
              {plan.period === MONTHLY_BILLING
                ? pricingPlan.priceMonthly
                : pricingPlan.priceYearly}
              .00
            </span>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="flex-grow">
            <span className="text-gray-600">Taxes (GST)</span>
          </div>
          <div className="pl-3">
            <span className="font-semibold">$0.00</span>
          </div>
        </div>
      </div>
      <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
        <div className="w-full flex items-center">
          <div className="flex-grow">
            <span className="text-gray-600">Total due today</span>
          </div>
          <div className="pl-3">
            <span className="font-semibold text-gray-400 text-sm">USD</span>{" "}
            <span className="font-semibold">
              $
              {plan.period === MONTHLY_BILLING
                ? pricingPlan.priceMonthly
                : pricingPlan.priceYearly}
              .00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
