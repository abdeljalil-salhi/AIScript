// Dependencies
import { FC } from "react";

// Assets
import { AIScriptDesaturated } from "@/assets/landing";
import { gradient } from "@/assets";
// SVGs
import { ChatBubbleWing } from "@/assets/svg/ChatBubbleWing";

// Interfaces
interface GradientProps {}
interface BookChatMessageProps {}
interface CoverChatMessageProps {}

/**
 * Gradient Component
 *
 * @interface GradientProps
 * @returns {JSX.Element} - Gradient Component
 * @exports Gradient
 */
export const Gradient: FC<GradientProps> = (): JSX.Element => {
  return (
    <div className="absolute top-0 -left-[10rem] w-[56.625rem] h-[56.625rem] opacity-50 mix-blend-color-dodge pointer-events-none">
      <img
        className="absolute top-1/2 left-1/2 w-[79.5625rem] max-w-[79.5625rem] h-[88.5625rem] -translate-x-1/2 -translate-y-1/2"
        src={gradient}
        width={1417}
        height={1417}
        alt="Gradient"
      />
    </div>
  );
};

/**
 * BookChatMessage Component;
 * Displays a chat bubble message for generating a book.
 *
 * @interface BookChatMessageProps
 * @returns {JSX.Element} - BookChatMessage Component
 * @exports BookChatMessage
 */
export const BookChatMessage: FC<BookChatMessageProps> = (): JSX.Element => {
  return (
    <div className="absolute top-8 left-[4rem] max-w-[17.5rem] py-6 px-8 bg-gray-900 rounded-t-xl rounded-br-xl font-code text-base lg:top-16 lg:right-[8.75rem] lg:max-w-[17.5rem]">
      Hey AIScript, generate a book for me.
      <ChatBubbleWing
        className="absolute right-full bottom-0 -scale-x-100"
        pathClassName="fill-gray-900"
      />
    </div>
  );
};

/**
 * CoverChatMessage Component;
 * Displays a chat bubble message for generating a cover.
 *
 * @interface CoverChatMessageProps
 * @returns {JSX.Element} - CoverChatMessage Component
 * @exports CoverChatMessage
 */
export const CoverChatMessage: FC<CoverChatMessageProps> = (): JSX.Element => {
  return (
    <div className="absolute top-8 left-[3.125rem] w-full max-w-[14rem] pt-2.5 pr-2.5 pb-7 pl-5 bg-n-6 rounded-t-xl rounded-br-xl font-code text-base md:max-w-[17.5rem]">
      Cover generated!
      <div className="absolute left-5 -bottom-[1.125rem] flex items-center justify-center w-[2.25rem] h-[2.25rem] bg-color-1 rounded-[0.75rem]">
        <img
          src={AIScriptDesaturated}
          width={27}
          height={27}
          alt="Brainwave"
          draggable={false}
        />
      </div>
      <p className="tagline absolute right-2.5 bottom-1 text-[0.625rem] text-n-3 uppercase">
        just now
      </p>
      <ChatBubbleWing
        className="absolute right-full bottom-0 -scale-x-100"
        pathClassName="fill-n-6"
      />
    </div>
  );
};
