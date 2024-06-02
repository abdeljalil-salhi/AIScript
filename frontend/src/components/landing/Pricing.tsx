// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";

// Assets
import { Sphere, Stars } from "@/assets/landing";
// Components
import { Gradient, LeftLine, RightLine } from "./design/Pricing";
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
            src={Sphere}
            width={255}
            height={255}
            className="relative z-1"
            alt="Small sphere"
            draggable={false}
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={Stars}
              width={950}
              height={400}
              className="w-full"
              alt="Stars"
            />
          </div>
        </div>
        <Heading
          tag="Get started with AIScript"
          title="Simple Pricing, No Surprises"
        />
        <div className="relative">
          <PricingList />
          <LeftLine />
          <RightLine />
          <Gradient />
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/pricing"
            className="text-xs font-grotesk font-bold tracking-widest uppercase text-n-1/85 hover:text-n-1/70 active:text-n-1/60"
            draggable={false}
          >
            See the full details
          </Link>
        </div>
      </div>
    </Section>
  );
};
