// Dependencies
import { FC, useRef } from "react";
import { ScrollParallax } from "react-just-parallax";

// Assets
import { Curve, Hero as HeroCard, HeroBackground } from "@/assets/landing";

// Constants
import { heroIcons } from "@/constants";

// Components
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { Button } from "./Button";
import { CompanyLogos } from "./CompanyLogos";
import { Generating } from "./Generating";
import { Notification } from "./Notification";
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
  const parallaxRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem] flex flex-col items-center">
          <h1 className="h3 sm:h1 mb-6 font-['Poppins']">
            Turn Ideas into&nbsp;Books
            <br />
            Instantly&nbsp;with{" "}
            <span className="inline-block relative">
              AIScript{" "}
              <img
                src={Curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
                draggable={false}
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8 font-['Poppins']">
            Experience the Future of Writing with AIScript. <br />
            Enhance Your Workflow and Produce High-Quality Books in Seconds.
          </p>
          <Button href="/register" white>
            Get Started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]"></div>
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={HeroCard}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  draggable={false}
                  alt="AI"
                />
                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon: string, index: number) => (
                      <li className="p-5" key={index}>
                        <img
                          src={icon}
                          width={24}
                          height={25}
                          alt={icon}
                          draggable={false}
                        />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title="Books generation"
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[104%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[104%] md:w-[138%] 2xl:w-[200%]">
            <img
              src={HeroBackground}
              className="w-full"
              width={1800}
              height={2250}
              draggable={false}
              alt="Hero"
            />
          </div>
          <BackgroundCircles />
        </div>
        <CompanyLogos className="block relative z-10 mt-20 lg:block" />
      </div>
      <BottomLine />
    </Section>
  );
};
