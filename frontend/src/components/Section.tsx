// Dependencies
import { FC, ReactNode } from "react";

// Components
import { SectionSvg } from "../assets/svg/SectionSvg";

// Interfaces
interface SectionProps {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string;
  children: ReactNode;
}

/**
 * Section Component
 *
 * @interface SectionProps
 * @returns {JSX.Element} - Section Component
 * @exports Section
 */
export const Section: FC<SectionProps> = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}): JSX.Element => {
  return (
    <div
      id={id}
      className={`relative ${
        customPaddings ||
        `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""} ${
          className || ""
        }`
      }`}
    >
      {children}
      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10"></div>
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10"></div>
      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 xl:right-10`}
          ></div>
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};
