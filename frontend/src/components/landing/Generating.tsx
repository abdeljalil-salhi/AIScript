// Dependencies
import { FC } from "react";

// Assets
import { LoadingSpin } from "@/assets/landing";

// Interfaces
interface GeneratingProps {
  className?: string;
}

/**
 * Generating Component
 *
 * @interface GeneratingProps
 * @returns {JSX.Element} - Generating Component
 * @exports Generating
 */
export const Generating: FC<GeneratingProps> = ({ className }): JSX.Element => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base font-['Poppins']`}
    >
      <img
        className="w-5 h-5 mr-4 animate-spin"
        src={LoadingSpin}
        alt="Loading..."
        draggable={false}
      />
      AI is generating...
    </div>
  );
};
