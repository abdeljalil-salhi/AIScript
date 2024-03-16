// Dependencies
import { FC } from "react";

// Constants
import { brainwaveServices } from "../constants";
// Assets
import { check, service1, service2 } from "../assets";
// Components
import { Generating } from "./Generating";
import { Heading } from "./Heading";
import { PhotoChatMessage } from "./design/Services";
import { Section } from "./Section";

// Interfaces
interface ServicesProps {}

/**
 * Services Component
 *
 * @interface ServicesProps
 * @returns {JSX.Element} - Services Component
 * @exports Services
 */
export const Services: FC<ServicesProps> = (): JSX.Element => {
  return (
    <Section id="how-to-use">
      <div className="container">
        <Heading
          title="Generative AI made for authors."
          text="AIScript unlocks the potential of AI-powered books."
        />
        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                src={service1}
                width={800}
                height={730}
                className="w-full h-full object-cover md:object-right"
                alt="Smartest AI"
                draggable={false}
              />
            </div>
            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Smartest AI</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                AIScript unlocks the potential of AI-powered e-books.
              </p>
              <ul className="body-2">
                {brainwaveServices.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      src={check}
                      width={24}
                      height={24}
                      alt="Check icon"
                      draggable={false}
                    />
                    <p className="ml-4">{service}</p>
                  </li>
                ))}
              </ul>
            </div>
            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:bottom-8 lg:-translate-x-1/2" />
          </div>
          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={service2}
                  width={630}
                  height={750}
                  className="h-full w-full object-cover"
                  alt="Robot"
                  draggable={false}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">E-book generation</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Automatically generate e-books using our AI technology. Try it
                  now!
                </p>
              </div>
              <PhotoChatMessage />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
