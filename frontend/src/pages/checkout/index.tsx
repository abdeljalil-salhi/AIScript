// Dependencies
import { FC, useEffect, useState } from "react";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ArrowLeftOutlined, LockFilled } from "@ant-design/icons";

// Constants
import { MONTHLY_BILLING, pricingPlans } from "@/constants/pricing";
import { cardPaymentMaintenance, checkoutPlans } from "@/constants/checkout";
import { CheckoutPlan, PricingPlan } from "@/constants/types";
// Pages
import { LoadingPage } from "../loading";

// Interfaces
interface CheckoutPageProps {}

interface CheckoutPageParams {
  // Plan ID from the URL
  planId: string;
  // Allow for other params
  [key: string]: string | undefined;
}

/**
 * Checkout Page Component
 *
 * @interface CheckoutPageProps
 * @returns {JSX.Element} - Checkout Page Component
 * @exports CheckoutPage
 */
export const CheckoutPage: FC<CheckoutPageProps> = (): JSX.Element => {
  /**
   * Plan state for the checkout page based on the plan ID from the URL
   */
  const [plan, setPlan] = useState<CheckoutPlan>({} as CheckoutPlan);
  const [pricingPlan, setPricingPlan] = useState<PricingPlan>(
    {} as PricingPlan
  );

  /**
   * Loading state for the checkout page
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Get the plan ID from the URL
   */
  const { planId }: Readonly<Partial<CheckoutPageParams>> =
    useParams<CheckoutPageParams>();

  /**
   * Navigate function for redirecting to other pages
   * @type {NavigateFunction}
   * @function
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Effect to set the plan and pricing plan states based on the plan ID
   * from the URL
   */
  useEffect(() => {
    setIsLoading(true);

    // Get the plan from the list of checkout plans
    const selectedPlan = checkoutPlans.find(
      (p: CheckoutPlan) => p.id === planId
    );

    // Set the plan and pricing plan states if the plan is found
    if (selectedPlan) {
      setPlan(selectedPlan);
      setPricingPlan(
        pricingPlans.find(
          (p: PricingPlan) => p.id === selectedPlan.pricingPlanId
        ) as PricingPlan
      );
      setIsLoading(false);
    }
    // Redirect to pricing page if plan is not found
    else navigate("/pricing");
  }, [navigate, planId]);

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="min-w-screen min-h-screen bg-gray-50 py-5 font-['Poppins'] flex flex-col items-center">
      <div className="px-5 w-full max-w-7xl">
        <div className="mb-2">
          <Link
            to="/pricing"
            className="focus:outline-none hover:underline text-gray-500 text-sm flex items-center hover:text-gray-600"
          >
            <ArrowLeftOutlined className="mr-1 text-xs" />
            Back
          </Link>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Subscribe to {plan.name}
          </h1>
        </div>
        <div className="mb-5 text-gray-400">
          <Link
            to="/pricing"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Pricing
          </Link>{" "}
          / <span className="text-gray-600">Checkout</span>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b xl:border xl:rounded-md border-gray-200 px-5 py-10 text-gray-800 flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-full max-w-7xl">
          <div className="-mx-3 md:flex items-start">
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
                    <span className="font-semibold text-gray-600 text-sm">
                      .00
                    </span>
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
                    <span className="font-semibold text-gray-400 text-sm">
                      USD
                    </span>{" "}
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
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-3 items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">Contact</span>
                  </div>
                  <div className="flex-grow pl-3">
                    <span>Scott Windon</span>
                  </div>
                </div>
                <div className="w-full flex items-center">
                  <div className="w-32">
                    <span className="text-gray-600 font-semibold">
                      Billing Address
                    </span>
                  </div>
                  <div className="flex-grow pl-3">
                    <span>123 George Street, Sydney, NSW 2000 Australia</span>
                  </div>
                </div>
              </div>
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                  <div className={cardPaymentMaintenance ? "mb-2" : "mb-5"}>
                    <label
                      htmlFor="type1"
                      className={`flex items-center cursor-pointer ${
                        cardPaymentMaintenance ? "mb-2" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type1"
                        checked
                      />
                      <img
                        src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                        className="h-6 ml-3"
                      />
                    </label>
                    {cardPaymentMaintenance && (
                      <span className="text-red-500 italic text-sm">
                        Card payment is currently disabled.
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        Name on card
                      </label>
                      <div>
                        <input
                          type="text"
                          placeholder="John Smith"
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
                          disabled={cardPaymentMaintenance}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        Card number
                      </label>
                      <div>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
                          disabled={cardPaymentMaintenance}
                        />
                      </div>
                    </div>
                    <div className="mb-3 -mx-2 flex items-end">
                      <div className="px-2 w-2/4">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 text-nowrap">
                          Expiration date
                        </label>
                        <div>
                          <select
                            className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
                            disabled={cardPaymentMaintenance}
                          >
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                        </div>
                      </div>
                      <div className="px-2 w-1/4">
                        <select
                          className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
                          disabled={cardPaymentMaintenance}
                        >
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                          <option value="2030">2030</option>
                          <option value="2031">2031</option>
                          <option value="2032">2032</option>
                          <option value="2033">2033</option>
                          <option value="2034">2034</option>
                          <option value="2035">2035</option>
                        </select>
                      </div>
                      <div className="px-2 w-1/4">
                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 text-nowrap">
                          CVV
                        </label>
                        <div>
                          <input
                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-gray-200/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-70 disabled:pointer-events-none"
                            placeholder="000"
                            type="number"
                            disabled={cardPaymentMaintenance}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3">
                  <label
                    htmlFor="type2"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-500"
                      name="type"
                      id="type2"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      width="80"
                      className="ml-3"
                    />
                  </label>
                </div>
              </div>
              <div>
                <button className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                  <LockFilled className="mr-2" />
                  Pay now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
