// Dependencies
import { ReactNode, FC } from "react";

// SVGs
import { ButtonSvg } from "../assets/svg/ButtonSvg";

// Interfaces
interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  px?: string;
  white?: boolean;
}

/**
 * Button Component
 *
 * @interface ButtonProps
 * @returns {JSX.Element} - Button Component
 * @exports Button
 */
export const Button: FC<ButtonProps> = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
}: ButtonProps): JSX.Element => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;

  const spanClasses = `relative z-10`;

  const renderButton = (): JSX.Element => (
    <button className={classes} onClick={onClick} draggable={false}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white })}
    </button>
  );

  const renderLink = (): JSX.Element => (
    <a href={href} className={classes} draggable={false}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white })}
    </a>
  );

  return href ? renderLink() : renderButton();
};
