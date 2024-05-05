// Dependencies
import { FC } from "react";

// Constants
import { MONTHLY_BILLING, YEARLY_BILLING } from "@/constants/pricing";

// Interfaces
interface BillingPeriodSwitchProps {
  billingPeriod: 0 | 1;
  setBillingPeriod: (period: 0 | 1) => void;
}

/**
 * Billing Period Switch Component
 *
 * @interface BillingPeriodSwitchProps
 * @returns {JSX.Element} - Billing Period Switch Component
 * @exports BillingPeriodSwitch
 */
export const BillingPeriodSwitch: FC<BillingPeriodSwitchProps> = ({
  billingPeriod,
  setBillingPeriod,
}): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full mb-8 md:mb-16 mt-4 md:mt-10">
      <div className="flex flex-row max-w-72 md:max-w-xs w-[80%] font-['Poppins']">
        <button
          className={`w-full py-2.5 text-sm md:text-base font-medium text-n-1 ${
            billingPeriod === MONTHLY_BILLING
              ? "bg-gradient-to-bl from-purple-600 to-blue-500"
              : "bg-n-7 hover:bg-n-6/70"
          } tracking-wide rounded-tl-lg rounded-bl-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer`}
          onClick={() => setBillingPeriod(MONTHLY_BILLING)}
        >
          Monthly Billing
        </button>
        <button
          className={`w-full py-2.5 text-sm md:text-base font-medium text-n-1 ${
            billingPeriod === YEARLY_BILLING
              ? "bg-gradient-to-bl from-purple-600 to-blue-500"
              : "bg-n-7 hover:bg-n-6/70"
          } tracking-wide rounded-tr-lg rounded-br-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer`}
          onClick={() => setBillingPeriod(YEARLY_BILLING)}
        >
          Yearly Billing
        </button>
      </div>
    </div>
  );
};
