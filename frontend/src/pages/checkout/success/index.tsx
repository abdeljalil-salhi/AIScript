// Dependencies
import { FC, useEffect, useState } from "react";
import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

// Constants
import { PaypalOrderResponse } from "@/constants/types";
// Components
import { Header } from "@/components/checkout/success/Header";

// Interfaces
interface CheckoutSuccessPageProps {}

interface CheckoutSuccessPageParams {
  // Order ID from the URL
  orderId: string;
  // Allow for other params
  [key: string]: string | undefined;
}

/**
 * Checkout Success Page Component
 *
 * @interface CheckoutSuccessPageProps
 * @returns {JSX.Element} - Checkout Success Page Component
 * @exports CheckoutSuccessPage
 */
export const CheckoutSuccessPage: FC<
  CheckoutSuccessPageProps
> = (): JSX.Element => {
  /**
   * Order details for the success page based on the order ID from the URL
   */
  const [orderDetails, setOrderDetails] = useState<PaypalOrderResponse>(
    {} as PaypalOrderResponse
  );

  /**
   * Loading state for the success page
   */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Get the location state from the URL
   * @type {PaypalOrderResponse}
   */
  const { state } = useLocation();

  /**
   * Navigate function for redirecting to other pages
   */
  const navigate: NavigateFunction = useNavigate();

  /**
   * Get the order ID from the URL
   */
  const { orderId }: Readonly<Partial<CheckoutSuccessPageParams>> =
    useParams<CheckoutSuccessPageParams>();

  /**
   * Get the order details from the navigation state
   * or redirect to the pricing page if there is no state
   */
  useEffect(() => {
    setIsLoading(true);

    if (state) setOrderDetails(state as PaypalOrderResponse);
    else {
      // Redirect to the pricing page if there is no state
      navigate("/pricing");
    }

    setIsLoading(false);
  }, [navigate, orderId, state]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-screen min-h-screen bg-gray-50 py-5 font-['Poppins'] flex flex-col items-center">
      <Header />

      <div className="w-full bg-white border-t border-b xl:border xl:rounded-md border-gray-200 px-5 py-10 text-gray-800 flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-full max-w-7xl">
          <div className="md:flex items-start flex-col">
            <div className="flex flex-col items-start justify-between px-3 pb-6 border-b border-gray-200 w-full">
              <p className="font-semibold text-base leading-7 text-black">
                Order ID{" "}
                <span className="text-gray-600 font-medium">
                  #{orderDetails.orderID}
                </span>
              </p>

              <p className="font-semibold text-base leading-7 text-black mt-1">
                Subscribed on{" "}
                <span className="text-gray-600 font-medium">
                  {" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>

              <p className="font-semibold text-base leading-7 text-black mt-1">
                Paid with{" "}
                {orderDetails.paymentSource === "card" ? (
                  "Card"
                ) : (
                  <img
                    src="/assets/paypal_payment.svg"
                    className="w-20 inline-block ml-2"
                    alt="PayPal logo"
                    draggable={false}
                  />
                )}
              </p>
            </div>

            <div className="flex items-center justify-center w-full py-6 lg:text-center text-gray-800 font-light text-lg md:text-xl min-h-48">
              You have successfully subscribed to the {orderDetails.plan.name}{" "}
              Plan.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
