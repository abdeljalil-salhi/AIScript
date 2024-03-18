// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";

// Assets
import { smallSphere, stars } from "../assets";
// Components
import { LeftLine, RightLine } from "./design/Pricing";
import { Heading } from "./Heading";
import { PricingList } from "./PricingList";
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
        <Heading tag="Get started with AIScript" title="Pay as you go" />
        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/pricing"
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            draggable={false}
          >
            See the full details
          </Link>
        </div>
      </div>
    </Section>
  );
};
