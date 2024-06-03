// Dependencies
import { FC } from "react";

// Constants
import { benefits } from "@/constants";
import { Benefit } from "@/constants/types";
// SVGs
import { Arrow } from "@/assets/svg/Arrow";
import { ClipPath } from "@/assets/svg/ClipPath";
// Components
import { GradientLight } from "./design/Benefits";
import { Heading } from "./Heading";
import { Section } from "./Section";

// Interfaces
interface BenefitsProps {}

/**
 * Benefits Component
 *
 * @interface BenefitsProps
 * @returns {JSX.Element} - Benefits Component
 * @exports Benefits
 */
export const Benefits: FC<BenefitsProps> = (): JSX.Element => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Achieve More with AIScript"
        />
        <div className="flex flex-wrap gap-10 mb-10 justify-center">
          {benefits.map((benefit: Benefit) => (
            <div
              key={benefit.id}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[22rem]"
              style={{ backgroundImage: `url(${benefit.backgroundUrl})` }}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h6 font-normal mb-5 font-['Poppins']">
                  {benefit.title}
                </h5>
                <p className="body-2 mb-6 text-n-3 font-['Poppins']">
                  {benefit.text}
                </p>
                <div className="flex items-center mt-auto">
                  <img
                    src={benefit.iconUrl}
                    width={48}
                    height={48}
                    alt={benefit.title}
                    draggable={false}
                  />
                  <a
                    href="/register"
                    className="ml-auto font-grotesk text-xs font-bold text-n-1 uppercase tracking-wider"
                  >
                    Explore more
                  </a>
                  <Arrow />
                </div>
              </div>
              {benefit.light && <GradientLight />}
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {benefit.imageUrl && (
                    <img
                      src={benefit.imageUrl}
                      className="w-full h-full object-cover"
                      width={380}
                      height={362}
                      alt={benefit.title}
                      draggable={false}
                    />
                  )}
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
