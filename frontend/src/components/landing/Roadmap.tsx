// Dependencies
import { FC } from "react";

// Assets
import { CheckLined, Grid, Loading } from "@/assets/landing";
// Constants
import { roadmap } from "@/constants";
import { Roadmap as RoadmapType } from "@/constants/types";
// Components
import { Gradient } from "./design/Roadmap";
import { Heading } from "./Heading";
import { Section } from "./Section";
import { Tagline } from "./Tagline";

// Interfaces
interface RoadmapProps {}

/**
 * Roadmap Component
 *
 * @interface RoadmapProps
 * @returns {JSX.Element} - Roadmap Component
 * @exports Roadmap
 */
export const Roadmap: FC<RoadmapProps> = (): JSX.Element => {
  return (
    <Section id="roadmap" className="overflow-hidden">
      <div className="container md:pb-10 mt-5">
        <Heading tag="Join the Journey" title="Our Future Vision" />
        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
          {roadmap.map((item: RoadmapType) => {
            const status: string =
              item.status === "done" ? "Done" : "In Progress";

            return (
              <div
                key={item.id}
                className={`md:flex even:md:translate-y-[7rem] p-0.5 rounded-[2.5rem] ${
                  item.colorful ? "bg-conic-gradient" : "bg-n-6"
                }`}
              >
                <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                  <div className="absolute top-0 left-0 max-w-full">
                    <img
                      src={Grid}
                      width={550}
                      height={550}
                      className="w-full"
                      alt="Grid"
                      draggable={false}
                    />
                  </div>
                  <div className="relative z-1 font-['Poppins']">
                    <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                      <Tagline>{item.date}</Tagline>
                      <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
                        <img
                          src={item.status === "done" ? CheckLined : Loading}
                          width={16}
                          height={16}
                          className="mr-2.5"
                          alt="Status"
                          draggable={false}
                        />
                        <div className="tagline">{status}</div>
                      </div>
                    </div>
                    <div className="mb-10 -my-10 -mx-15">
                      <img
                        src={item.imageUrl}
                        width={630}
                        height={420}
                        className="w-full"
                        alt={item.title}
                        draggable={false}
                      />
                    </div>
                    <h4 className="h4 mb-4">{item.title}</h4>
                    <p className="body-2 text-n-4">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <Gradient />
        </div>
      </div>
    </Section>
  );
};
