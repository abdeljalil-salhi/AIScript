// Dependencies
import { FC } from "react";

// Interfaces
interface ArrowProps {}

/**
 * Arrow Component
 *
 * @interface ArrowProps
 * @returns {JSX.Element} - Arrow Component
 * @exports Arrow
 */
export const Arrow: FC<ArrowProps> = (): JSX.Element => {
  return (
    <svg className="ml-5 fill-n-1" width="24" height="24">
      <path d="M8.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L13.586 12 8.293 6.707a1 1 0 0 1 0-1.414z" />
    </svg>
  );
};
