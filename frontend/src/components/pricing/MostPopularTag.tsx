// Dependencies
import { FC } from "react";

// Interfaces
interface MostPopularTagProps {}

/**
 * Most Popular Tag Component
 *
 * @interface MostPopularTagProps
 * @returns {JSX.Element} - Most Popular Tag Component
 * @exports MostPopularTag
 */
export const MostPopularTag: FC<MostPopularTagProps> = (): JSX.Element => {
  return (
    <div className="absolute top-0 right-0 mr-5 -mt-4">
      <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-gradient-to-bl from-purple-600 to-blue-500 text-white rounded-full shadow-md select-none cursor-default tracking-wide shadow-purple-600/20">
        Most Popular
      </div>
    </div>
  );
};
