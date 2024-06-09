// Dependencies
import { FC } from "react";

// Assets
import {
  CheckIcon,
  ServiceOne,
  ServiceTwo,
  ServiceThree,
} from "@/assets/landing";
// Constants
import { serviceIcons, services } from "@/constants";
import { ServiceIcon } from "@/constants/types";
// Components
import { BookChatMessage, CoverChatMessage, Gradient } from "./design/Services";
import { Generating } from "./Generating";
import { Heading } from "./Heading";
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
    <Section id="services">
      <div className="container mt-5">
        <Heading
          title="Generative AI Made for Writers"
          text="Experience the Magic of AI in Crafting Your Next Bestseller."
        />
        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                src={ServiceOne}
                width={800}
                height={730}
                className="w-full h-full object-cover md:object-right brightness-50 md:brightness-100"
                alt="Next-Gen AI"
                draggable={false}
              />
            </div>
            <div className="relative z-1 max-w-[17rem] ml-auto font-['Poppins']">
              <h4 className="h4 mb-4">Next-Gen AI</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                AIScript unleashes the power of AI to craft stunning books.
              </p>
              <ul className="body-2">
                {services.map((service: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img
                      src={CheckIcon}
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
                  src={ServiceTwo}
                  width={630}
                  height={750}
                  className="h-full w-full object-cover brightness-75 grayscale-[25%]"
                  alt="Robot"
                  draggable={false}
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15 font-['Poppins']">
                <h4 className="h4 mb-4">Book Generation</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  Effortlessly create books with our advanced AI technology.{" "}
                  <br className="hidden sm:block" />
                  Try it now!
                </p>
              </div>
              <BookChatMessage />
            </div>
            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8 font-['Poppins']">
                <h4 className="h4 mb-4">Cover Generation</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  The world&apos;s first AI-powered book cover generator. Create
                  an artistic book cover in seconds. What will you create?
                </p>
                <ul className="flex items-center justify-between">
                  {serviceIcons.map((service: ServiceIcon) => (
                    <li
                      key={service.id}
                      className={`flex items-center justify-center rounded-2xl ${
                        service.id === "2"
                          ? "w-[3rem] h-[3rem] p-0.5 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          service.id === "2"
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img
                          src={service.icon}
                          width={service.width}
                          alt="Service Icon"
                          draggable={false}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <img
                  src={ServiceThree}
                  width={520}
                  height={400}
                  className="w-full h-full object-cover"
                  alt="Futuristic AI"
                  draggable={false}
                />
                <CoverChatMessage />
              </div>
            </div>
          </div>
          <Gradient />
        </div>
      </div>
    </Section>
  );
};
