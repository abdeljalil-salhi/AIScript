// Dependencies
import { FC } from "react";

// Assets
import curve from "../assets/hero/curve.png";
import robot from "../assets/hero/robot.jpg";
import heroBackground from "../assets/hero/hero-background.jpg";

// Components
import { Button } from "./Button";
import { Section } from "./Section";

// Interfaces
interface HeroProps {}

/**
 * Hero Component
 *
 * @interface HeroProps
 * @returns {JSX.Element} - Hero Component
 * @exports Hero
 */
export const Hero: FC<HeroProps> = (): JSX.Element => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      id="hero"
    >
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
          <h1 className="h1 mb-6">
            Explore the Possibilities of AI with{" "}
            <span className="inline-block relative">
              AIScript{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of AI within AIScript. Upgrade your productivity
            with AIScript, the AI-powered tool that helps you write ebooks in
            seconds.
          </p>
          <Button href="/pricing" white>
            Get Started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]"></div>
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  draggable={false}
                  alt="AI"
                />
              </div>
            </div>
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              draggable={false}
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
