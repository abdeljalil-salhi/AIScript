// Dependencies
import { FC, ForwardRefExoticComponent, RefAttributes } from "react";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

// Interfaces
interface CounterInputProps {
  name: string;
  Icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
  >;
  items: number;
  setItems: (value: number) => void;
  width?: string;
  min?: number;
  max?: number;
}

/**
 * CounterInput Component
 *
 * @interface CounterInputProps
 * @returns {JSX.Element} - CounterInput Component
 * @exports CounterInput
 */
export const CounterInput: FC<CounterInputProps> = ({
  name,
  Icon,
  items,
  setItems,
  width = "2.5",
  min = 1,
  max = 10,
}): JSX.Element => {
  return (
    <div className="relative flex items-center w-full">
      <button
        type="button"
        className="bg-n-7 hover:bg-n-6 border border-n-6/70 rounded-s-lg p-3 h-11 duration-300 ease-in-out"
        onClick={() => setItems(items - 1 < min ? min : items - 1)}
      >
        <svg
          className="w-3 h-3 text-n-13"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        id="bedrooms-input"
        className="bg-n-7 hover:bg-n-6 border border-n-6/70 h-11 font-medium text-center text-n-4 text-sm w-full pb-6 transition duration-300 ease-in-out outline-none focus:border-n-4"
        value={items}
        required
      />
      <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-n-13 space-x-1 rtl:space-x-reverse">
        <Icon className={`w-${width} h-${width} text-n-13`} />
        <span>
          {name.charAt(0).toUpperCase() + name.slice(1)}
          {items > 1 ? "s" : ""}
        </span>
      </div>
      <button
        type="button"
        className="bg-n-7 hover:bg-n-6 border border-n-6/70 rounded-e-lg p-3 h-11 duration-300 ease-in-out"
        onClick={() => setItems(items + 1 > max ? max : items + 1)}
      >
        <svg
          className="w-3 h-3 text-n-13"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};
