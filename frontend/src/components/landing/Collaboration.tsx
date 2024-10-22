// Dependencies
import { FC } from "react";

// Assets
import { AIScriptNoText } from "@/assets";
import { CheckIcon } from "@/assets/landing";
// Constants
import {
  collaborationApps,
  collaborationContent,
  collaborationText,
} from "@/constants";
import { CollaborationApp, CollaborationContent } from "@/constants/types";
// Components
import { LeftCurve, RightCurve } from "./design/Collaboration";
import { Button } from "./Button";
import { Section } from "./Section";

// Interfaces
interface CollaborationProps {}

/**
 * Collaboration Component
 *
 * @interface CollaborationProps
 * @returns {JSX.Element} - Collaboration Component
 * @exports Collaboration
 */
export const Collaboration: FC<CollaborationProps> = (): JSX.Element => {
  return (
    <Section crosses>
      <div className="container lg:flex font-['Poppins']">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            The Ultimate AI&nbsp;Tool{" "}
            <span className="text-nowrap">
              for{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-500 webkit-bg-clip-text inline-block">
                Authors
              </span>
            </span>
          </h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collaborationContent.map((content: CollaborationContent) => (
              <li key={content.id} className="mb-3 py-3">
                <div className="flex items-center">
                  <img
                    src={CheckIcon}
                    width={24}
                    height={24}
                    alt="Check icon"
                    draggable={false}
                  />
                  <h6 className="body-2 ml-5">{content.title}</h6>
                </div>
                {content.text && (
                  <p className="body-2 mt-3 text-n-4">{content.text}</p>
                )}
              </li>
            ))}
          </ul>
          <Button className="mb-8" href="/register">Try it now</Button>
        </div>
        <div className="lg:ml-auto xl:w-[38rem]">
          <p className="body-2 mb-10 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collaborationText}
          </p>
          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={AIScriptNoText}
                    width={50}
                    height={50}
                    alt="AIScript"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
            <ul>
              {collaborationApps.map((app: CollaborationApp) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    Number(app.id) * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      Number(app.id) * 45
                    }`}
                  >
                    <img
                      src={app.icon}
                      width={app.width}
                      className="m-auto"
                      alt={app.title}
                      draggable={false}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};
