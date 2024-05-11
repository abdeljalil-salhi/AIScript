// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

// Interfaces
interface HeaderProps {}

/**
 * Checkout Cancel Header Component
 *
 * @interface HeaderProps
 * @returns {JSX.Element} - Checkout Cancel Header Component
 * @exports Header
 */
export const Header: FC<HeaderProps> = (): JSX.Element => {
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
          Payment Canceled
        </h1>
      </div>
      <div className="mb-5 text-gray-400">
        <Link
          to="/pricing"
          className="focus:outline-none hover:underline text-gray-500 hover:text-gray-600"
        >
          Pricing
        </Link>{" "}
        / <span className="text-gray-500">Checkout</span> /{" "}
        <span className="text-gray-600">Cancel</span>
      </div>
    </div>
  );
};
