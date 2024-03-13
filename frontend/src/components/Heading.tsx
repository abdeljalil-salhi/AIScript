// Dependencies
import { FC } from "react";

// Interfaces
interface HeadingProps {
  className?: string;
  title?: string;
}

/**
 * Heading Component
 *
 * @interface HeadingProps
 * @returns {JSX.Element} - Heading Component
 * @exports Heading
 */
export const Heading: FC<HeadingProps> = ({
  className,
  title,
}): JSX.Element => {
  return (
    <div className={`${className || ""} max-w-[50rem] mx-auto mb-12 lg:mb-20`}>
      {title && <h2 className="h2">{title}</h2>}
    </div>
  );
};
