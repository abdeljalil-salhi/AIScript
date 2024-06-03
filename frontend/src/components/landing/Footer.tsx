// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";

// Constants
import { socials } from "@/constants";
import { Social } from "@/constants/types";
// Components
import { Section } from "./Section";

// Interfaces
interface FooterProps {}

/**
 * Footer Component
 *
 * @interface FooterProps
 * @returns {JSX.Element} - Footer Component
 * @exports Footer
 */
export const Footer: FC<FooterProps> = (): JSX.Element => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <p className="caption text-n-4 lg:block font-['Poppins']">
          &copy; AIScript {new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex gap-5 flex-wrap">
          {socials.map((social: Social) => (
            <Link
              to={social.url}
              key={social.id}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              draggable={false}
            >
              <img
                src={social.iconUrl}
                width={16}
                height={16}
                alt={social.title}
                draggable={false}
              />
            </Link>
          ))}
        </ul>
      </div>
    </Section>
  );
};
