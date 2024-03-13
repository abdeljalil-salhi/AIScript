// Dependencies
import { FC } from "react";

// Assets
import { check } from "../assets";
// Constants
import { collabContent } from "../constants";
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
      </div>
    </Section>
  );
};
