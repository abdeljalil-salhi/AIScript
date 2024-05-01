// Dependencies
import { FC } from "react";
import { createPortal } from "react-dom";

// Components
import { Backdrop } from "../Backdrop";

// Interfaces
interface VerifyEmailModalProps {
  email: string;
  open: boolean;
  onClose: () => void;
}

/**
 * Verify Email address Modal Component
 *
 * @interface VerifyEmailModalProps
 * @returns {JSX.Element} - Verify Email address Modal Component
 * @exports VerifyEmailModal
 */
export const VerifyEmailModal: FC<VerifyEmailModalProps> = ({
  email,
  open,
  onClose,
}): JSX.Element => {
  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-5/6 sm:w-fit h-fit rounded-lg">
        <div className="rounded-lg w-full sm:w-96 m-auto text-end py-4">
          <h1 className="text-xl font-bold w-full border-b text-center border-n-5 pb-3">
            Check your inbox
          </h1>
          <p className="mt-2 p-4 w-full text-center">
            We are glad, that you’re with us ? We have sent you a verification
            link to the email address{" "}
            <span className="font-bold text-n-4 cursor-pointer hover:underline">
              {email}
            </span>
            .
          </p>
          <button
            className="mt-2 mr-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-[calc(100%-2rem)] mx-4"
            onClick={onClose}
          >
            Okay
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
