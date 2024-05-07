// Dependencies
import { FC } from "react";

// Constants
import { cardPaymentMaintenance } from "@/constants/checkout";
import { LockFilled } from "@ant-design/icons";

// Interfaces
interface CardPaymentProps {}

/**
 * Card Payment Component
 *
 * @interface CardPaymentProps
 * @returns {JSX.Element} - Card Payment Component
 * @exports CardPayment
 */
export const CardPayment: FC<CardPaymentProps> = (): JSX.Element => {
  return (
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
            required
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
            placeholder="1234 1234 1234 1234"
            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
            disabled={cardPaymentMaintenance}
            required
          />
        </div>
      </div>
      <div className="mb-3 -mx-2 flex items-end">
        <div className="px-2 w-2/4">
          <label className="text-gray-600 font-semibold text-sm mb-2 ml-1 text-nowrap">
            Expiry date
          </label>
          <div>
            <select
              className="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer bg-gray-200/30 disabled:opacity-70 disabled:pointer-events-none disabled:text-gray-400"
              disabled={cardPaymentMaintenance}
              required
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
            required
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
              placeholder="123"
              type="number"
              disabled={cardPaymentMaintenance}
              required
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold transition-all ease-in-out duration-300 disabled:opacity-70 disabled:pointer-events-none"
          disabled={cardPaymentMaintenance}
        >
          <LockFilled className="mr-2" />
          Pay now
        </button>
      </div>
    </div>
  );
};
