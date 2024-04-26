// Dependencies
import { FC } from "react";
import { createPortal } from "react-dom";

// Components
import { Backdrop } from "../Backdrop";

// Interfaces
interface VerifyEmailModalProps {
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
  open,
  onClose,
}): JSX.Element => {
  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit">
        verify email address modal
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
