// Dependencies
import { FC } from "react";
import { createPortal } from "react-dom";

// Components
import { Backdrop } from "../Backdrop";

// Interfaces
interface Enable2FAModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Enable 2FA Modal Component
 *
 * @interface Enable2FAModalProps
 * @returns {JSX.Element} - Enable 2FA Modal Component
 * @exports Enable2FAModal
 */
export const Enable2FAModal: FC<Enable2FAModalProps> = ({
  open,
  onClose,
}): JSX.Element => {
  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit">
        enable 2fa modal
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
