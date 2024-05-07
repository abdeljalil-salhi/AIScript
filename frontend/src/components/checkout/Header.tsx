// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Constants
import { CheckoutPlan } from "@/constants/types";

// Interfaces
interface HeaderProps {
  plan: CheckoutPlan;
}

/**
 * Checkout Header Component
 *
 * @interface HeaderProps
 * @returns {JSX.Element} - Checkout Header Component
 * @exports Header
 */
export const Header: FC<HeaderProps> = ({ plan }): JSX.Element => {
  return (
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
  );
};
