// Dependencies
import { FC, RefObject, useEffect, useRef, useState } from "react";

// Constants
import { companyLogos } from "@/constants";
// Utils
import { cn } from "@/utils/cn";

// Interfaces
interface CompanyLogosProps {
  className?: string;
}

/**
 * CompanyLogos Component
 *
 * @interface CompanyLogosProps
 * @returns {JSX.Element} - CompanyLogos Component
 * @exports CompanyLogos
 */
export const CompanyLogos: FC<CompanyLogosProps> = ({
  className,
}): JSX.Element => {
  /**
   * The `start` state is used to check if the animation has started or not.
   * If the animation has not started, the `addAnimation` function is called.
   * @type {boolean}
   * @default false
   */
  const [start, setStart] = useState<boolean>(false);

  /**
   * The direction of the animation. It can be either `left` or `right`.
   * @type {string}
   * @default "left"
   */
  const direction: string = "left";
  /**
   * The speed of the animation. It can be either `fast`, `normal`, or `slow`.
   * @type {string}
   * @default "fast"
   */
  const speed: string = "fast";
  /**
   * The pauseOnHover state is used to pause the animation when the user hovers over the container.
   * @type {boolean}
   * @default false
   */
  const pauseOnHover: boolean = false;

  /**
   * The containerRef is used to reference the container element.
   * @type {RefObject<HTMLDivElement>}
   */
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  /**
   * The scrollerRef is used to reference the scroller element which contains the company logos.
   * @type {RefObject<HTMLUListElement>}
   */
  const scrollerRef: RefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);

  /**
   * Hook to add the animation to the scroller.
   * If the animation has not started, the `addAnimation` function is called.
   */
  useEffect(() => {
    const addAnimation = (): void => {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent: Element[] = Array.from(
          scrollerRef.current.children
        );

        scrollerContent.forEach((item: Element) => {
          const duplicatedItem: Node = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });

        getDirection();
        getSpeed();
        setStart(true);
      }
    };

    if (!start) addAnimation();
  }, [start]);

  /**
   * Function to get the direction of the animation.
   * And sets the `--animation-direction` CSS variable to `forwards` or `reverse`.
   * @returns {void}
   */
  const getDirection = (): void => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  /**
   * Function to get the speed of the animation.
   * And sets the `--animation-duration` CSS variable to `20s`, `40s`, or `80s`.
   * @returns {void}
   */
  const getSpeed = (): void => {
    if (containerRef.current) {
      if (speed === "fast")
        containerRef.current.style.setProperty("--animation-duration", "20s");
      else if (speed === "normal")
        containerRef.current.style.setProperty("--animation-duration", "40s");
      else
        containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  };

  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        Helping people create beautiful content at
      </h5>
      <div
        ref={containerRef}
        className={cn(
          "relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll ",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {companyLogos.map((logo: string, index: number) => (
            <li
              key={index}
              className="flex items-center justify-center flex-1 h-[8.5rem] w-[200px]"
            >
              <img
                src={logo}
                width={135}
                alt="Company Logo"
                draggable={false}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
