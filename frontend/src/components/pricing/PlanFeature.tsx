// Dependencies
import { FC } from "react";

// Assets
import { check } from "@/assets";

// Interfaces
interface PlanFeatureProps {
  feature: string;
}

/**
 * PlanFeature Component
 *
 * @interface PlanFeatureProps
 * @returns {JSX.Element} - PlanFeature Component
 * @exports PlanFeature
 */
export const PlanFeature: FC<PlanFeatureProps> = ({ feature }): JSX.Element => {
  return (
    <li className="flex flex-row gap-2 items-center justify-start">
      <span className="text-n-1 text-sm">
        <img
          src={check}
          width={16}
          height={16}
          className="brightness-[.8]"
          alt="Check icon"
          draggable={false}
        />
      </span>
      <p className="text-n-1/80 text-sm font-light tracking-wide">{feature}</p>
    </li>
  );
};
