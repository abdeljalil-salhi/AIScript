// Dependencies
import { FC } from "react";

// Interfaces
interface ButtonGradientProps {}

/**
 * ButtonGradient SVG component
 * This SVG component is used to create the gradients for the button.
 *
 * [#3b82f6] blue-500
 * [#9333ea] purple-600
 * [#6d28d9] violet-700
 * [#4338ca] indigo-700
 *
 * @interface ButtonGradientProps
 * @returns {JSX.Element} - ButtonGradient SVG component
 * @exports ButtonGradient
 */
export const ButtonGradient: FC<ButtonGradientProps> = (): JSX.Element => {
  return (
    <svg className="block" width={0} height={0}>
      <defs>
        <linearGradient id="btn-left" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="btn-top" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <linearGradient id="btn-bottom" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient
          id="btn-right"
          x1="14.635%"
          x2="14.635%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#4338ca" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
    </svg>
  );
};
