// Dependencies
import { ReactNode, FC } from "react";
import { Link } from "react-router-dom";

// SVGs
import { ButtonSvg } from "@/assets/svg/ButtonSvg";

// Interfaces
interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  px?: string;
  white?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
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
  type,
  disabled = false,
}: ButtonProps): JSX.Element => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;

  const spanClasses = `relative z-10`;

  const renderButton = (): JSX.Element => (
    <button
      className={classes}
      onClick={onClick}
      draggable={false}
      type={type || "button"}
      disabled={disabled}
    >
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white })}
    </button>
  );

  const renderLink = (): JSX.Element => (
    // `href as string` because if we want to render a link, it will have the href prop
    <Link to={href as string} className={classes} draggable={false}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white })}
    </Link>
  );

  return href ? renderLink() : renderButton();
};
