// Dependencies
import { FC } from "react";

// Assets
import { smallSphere, stars } from "../assets";
// Components
import { Section } from "./Section";

// Interfaces
interface PricingProps {}

/**
 * Pricing Component
 *
 * @interface PricingProps
 * @returns {JSX.Element} - Pricing Component
 * @exports Pricing
 */
export const Pricing: FC<PricingProps> = (): JSX.Element => {
  return (
    <Section id="pricing" className="overflow-hidden">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            width={255}
            height={255}
            className="relative z-1"
            alt="Small sphere"
            draggable={false}
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              width={950}
              height={400}
              className="w-full"
              alt="Stars"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
