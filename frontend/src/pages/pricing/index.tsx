// Dependencies
import { FC, useState } from "react";

// Assets
import { check } from "@/assets";
// Constants
import { mostPopularPlanId, pricingPlans } from "@/constants/pricing";
import { PricingPlan } from "@/constants/types";

// Interfaces
interface PricingPageProps {}

const currentPlan: string = "0";

const MONTHLY_BILLING = 0;
const YEARLY_BILLING = 1;

/**
 * Pricing Page Component
 *
 * @interface PricingPageProps
 * @returns {JSX.Element} - Pricing Page Component
 * @exports PricingPage
 */
export const PricingPage: FC<PricingPageProps> = (): JSX.Element => {
  /**
   * Billing Period State
   * @type {number}
   * @default MONTHLY_BILLING
   * @description 0 - Monthly Billing, 1 - Yearly Billing
   */
  const [billingPeriod, setBillingPeriod] = useState(MONTHLY_BILLING);

  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      <div className="flex flex-col gap-3 items-center justify-center w-full pt-6">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-wide text-n-1">
          Manage Subscription
        </h2>
        <h4 className="text-base md:text-lg text-n-4 tracking-wide">
          Choose the plan that fits your needs.
        </h4>
      </div>

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

      <div className="max-w-6xl md:mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {pricingPlans.map((item: PricingPlan) => (
          <div
            key={item.id}
            className="relative flex flex-col h-full p-6 rounded-2xl shadow-md bg-n-7 border border-n-6/70 lg:odd:my-4"
          >
            {mostPopularPlanId === item.id && (
              <div className="absolute top-0 right-0 mr-5 -mt-4">
                <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-gradient-to-bl from-purple-600 to-blue-500 text-white rounded-full shadow-md select-none cursor-default tracking-wide shadow-purple-600/20">
                  Most Popular
                </div>
              </div>
            )}

            <div className="mb-10">
              <div className="text-n-1 text-xl font-semibold mb-1 tracking-wide">
                {item.title}
              </div>

              <div className="inline-flex items-baseline mb-2">
                <span className="text-n-1 text-3xl font-semibold">$</span>
                <span className="text-n-1 text-4xl font-semibold">
                  {billingPeriod === MONTHLY_BILLING
                    ? item.priceMonthly
                    : item.priceYearlyPerMonth}
                </span>
                <span className="text-n-4 text-base font-normal ml-1.5">
                  {billingPeriod === MONTHLY_BILLING
                    ? item.priceMonthly === 0
                      ? "Free"
                      : "/ month"
                    : item.priceYearlyPerMonth === 0
                    ? "Free"
                    : "/ month"}
                </span>
              </div>

              <div className="text-n-4 text-sm mb-10">{item.description}</div>

              {currentPlan === item.id ? (
                <div className="rounded-lg p-0.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl">
                  <div className="rounded-[calc(1.5rem-1px)]">
                    <span className="w-full inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-n-5 px-3.5 py-2.5 text-sm font-medium text-n-1 shadow-sm hover:bg-n-5/80 transition-all duration-300 ease-in-out cursor-pointer">
                      Active
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <span className="w-full inline-flex justify-center items-center whitespace-nowrap rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-3.5 py-2.5 text-sm font-medium text-n-1 shadow-sm transition-all duration-300 ease-in-out cursor-pointer">
                    Subscribe
                  </span>

                  <div className="absolute -bottom-6 w-full flex items-center justify-center">
                    <span
                      className="text-transparent bg-gradient-to-br from-purple-600 hover:from-purple-600/80 to-blue-500 hover:to-blue-500/80 webkit-bg-clip-text inline-block text-sm tracking-wide cursor-pointer transition-all duration-300 ease-in-out hover:underline"
                      onClick={() =>
                        setBillingPeriod(
                          billingPeriod === MONTHLY_BILLING
                            ? YEARLY_BILLING
                            : MONTHLY_BILLING
                        )
                      }
                    >
                      {billingPeriod === MONTHLY_BILLING
                        ? "Save with yearly billing (20% off)"
                        : "Switch to monthly billing"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <hr className="border border-n-6/90 w-full h-px opacity-50" />

            <ul className="flex flex-col gap-4 mt-5">
              {item.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex flex-row gap-2 items-center justify-start"
                >
                  <span className="text-n-1 text-sm">
                    <img
                      src={check}
                      width={16}
                      height={16}
                      className="brightness-[.8]"
                      alt="Check icon"
                      draggable={false}
                    />
                  </span>
                  <p className="text-n-1/80 text-sm font-light tracking-wide">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
