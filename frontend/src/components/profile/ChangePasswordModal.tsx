// Dependencies
import { FC, FormEvent } from "react";
import { createPortal } from "react-dom";
import { useLogout } from "@refinedev/core";

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
  /**
   * Logout mutation hook;
   * used to logout the user
   */
  const { mutate: logout } = useLogout();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // get the form data
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("current-password");
    const newPassword = formData.get("new-password");
    const confirmNewPassword = formData.get("confirm-new-password");

    // Check if the new password and confirm new password are the same
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    }

    // Check if the new password is the same as the current password
    if (currentPassword === newPassword) {
      alert("New password must be different from the current password.");
      return;
    }

    // Log the form data
    console.log({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    alert("Password changed successfully!");
    logout();
  };

  // If the modal is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} dark />
      <div className="z-[11] absolute bg-n-7 m-auto left-0 right-0 top-0 bottom-0 w-11/12 sm:w-fit h-fit rounded-lg">
        <div className="rounded-lg w-full sm:w-96 lg:w-[36rem] xl:w-[42rem] m-auto py-4">
          <h1 className="text-xl font-bold w-full border-b text-center border-n-5 pb-3 text-n-1/85">
            Create new password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 font-['Poppins'] w-full max-w-96 lg:max-w-2xl p-4 pb-1 m-auto"
          >
            <div className="w-full text-n-1/85">
              Your new password must be different from previous used passwords.
            </div>
            <div className="w-full">
              <input
                type="password"
                name="current-password"
                placeholder="Current password"
                className="w-full placeholder-n-10 text-n-3 max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
                required
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="new-password"
                placeholder="New password"
                className="w-full placeholder-n-10 text-n-3 max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
                required
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                name="confirm-new-password"
                placeholder="Confirm new password"
                className="w-full placeholder-n-10 text-n-3 max-w-96 lg:max-w-full p-2 bg-transparent border border-n-6/70 rounded-md outline-none focus:border-n-4 duration-300 ease-in-out font-light"
                required
              />
              <div className="w-full text-end mt-2 text-n-4 text-xs font-light italic">
                You will be logged out after changing your password.
              </div>
            </div>
            <button
              type="submit"
              className="mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl px-4 py-2 rounded-md shadow-md cursor-pointer transition-all ease-in-out w-full"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
