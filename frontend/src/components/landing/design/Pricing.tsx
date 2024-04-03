// Dependencies
import { FC } from "react";

// Assets
import { lines } from "@/assets";

// Interfaces
interface LeftLineProps {}
interface RightLineProps {}

/**
 * LeftLine Component
 *
 * @interface LeftLineProps
 * @returns {JSX.Element} - LeftLine Component
 * @exports LeftLine
 */
export const LeftLine: FC<LeftLineProps> = (): JSX.Element => {
  return (
    <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none">
      <img
        className="w-full"
        src={lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
};

/**
 * RightLine Component
 *
 * @interface RightLineProps
 * @returns {JSX.Element} - RightLine Component
 * @exports RightLine
 */
export const RightLine: FC<RightLineProps> = (): JSX.Element => {
  return (
    <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
      <img
        className="w-full"
        src={lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
};
