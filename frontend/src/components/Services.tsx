// Dependencies
import { FC } from "react";

// Constants
import { brainwaveServices, brainwaveServicesIcons } from "../constants";
// Assets
import { check, service1, service2, service3 } from "../assets";
// Components
import { Generating } from "./Generating";
import { Heading } from "./Heading";
import {
  Gradient,
  PhotoChatMessage,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";
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
                {brainwaveServices.map((service, index: number) => (
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
            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">Cover generation</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  The world&apos;s first AI-powered book cover generator. Create
                  a professional book cover in seconds. What will you create?
                </p>
                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((service, index: number) => (
                    <li
                      key={index}
                      className={`flex items-center justify-center rounded-2xl ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img
                          src={service}
                          width={24}
                          height={24}
                          alt="Service icon"
                          draggable={false}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={service3}
                  width={520}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Futuristic robot"
                  draggable={false}
                />
                <VideoChatMessage />
                <VideoBar />
              </div>
            </div>
          </div>
          <Gradient />
        </div>
      </div>
    </Section>
  );
};
