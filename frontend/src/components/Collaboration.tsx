// Dependencies
import { FC } from "react";

// Assets
import { brainwaveSymbol, check } from "../assets";
// Constants
import { collabContent, collabText } from "../constants";
// Components
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
      <div className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            AI&nbsp;Writing&nbsp;Assistant for&nbsp;Authors
          </h2>
          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((content) => (
              <li key={content.id} className="mb-3 py-3">
                <div className="flex items-center">
                  <img
                    src={check}
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
          <Button>Try it now</Button>
        </div>
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-4 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>
          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="AIScript"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
