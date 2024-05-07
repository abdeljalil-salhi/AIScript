// Dependencies
import { FC } from "react";
import { useParams } from "react-router-dom";

// Components
import { Header } from "@/components/cancel/Header";

// Interfaces
interface CancelPageProps {}

interface CancelPageParams {
  // Order ID from the URL
  orderId: string;
  // Allow for other params
  [key: string]: string | undefined;
}

/**
 * Cancel Page Component
 *
 * @interface CancelPageProps
 * @returns {JSX.Element} - Cancel Page Component
 * @exports CancelPage
 */
export const CancelPage: FC<CancelPageProps> = (): JSX.Element => {
  /**
   * Get the order ID from the URL
   */
  const { orderId }: Readonly<Partial<CancelPageParams>> =
    useParams<CancelPageParams>();

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-5 font-['Poppins'] flex flex-col items-center">
      <Header />

      <div className="w-full bg-white border-t border-b xl:border xl:rounded-md border-gray-200 px-5 py-10 text-gray-800 flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-full max-w-7xl">
          <div className="md:flex items-start flex-col">
            <div className="flex flex-col items-start justify-between px-3 pb-6 border-b border-gray-200 w-full">
              <p className="font-semibold text-base leading-7 text-black">
                Order ID{" "}
                <span className="text-gray-600 font-medium">
                  #{orderId || "N/A"}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center w-full py-6 lg:text-center text-gray-800 font-light text-lg md:text-xl min-h-48">
              Your payment has been canceled.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};