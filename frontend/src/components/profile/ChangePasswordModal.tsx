// Dependencies
import { FC } from "react";
import { createPortal } from "react-dom";
import { Backdrop } from "../Backdrop";

// Interfaces
interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Change Password Modal Component
 *
 * @interface ChangePasswordModalProps
 * @returns {JSX.Element} - Change Password Modal Component
 * @exports ChangePasswordModal
 */
export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  open,
  onClose,
}): JSX.Element => {
  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit">
        change password modal
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
