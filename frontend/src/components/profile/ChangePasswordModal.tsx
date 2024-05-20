// Dependencies
import { FC, FormEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import { useCustomMutation, useLogout, useNotification } from "@refinedev/core";

// Components
import { Backdrop } from "../Backdrop";
// GraphQL Mutations
import { MUTATION_CHANGE_PASSWORD } from "@/graphql/mutations/changePassword";
// GraphQL Types
import { ChangePasswordMutation } from "@/graphql/types";
import { MeResponse } from "@/graphql/schema.types";
// Providers
import { API_URL } from "@/providers";

// Interfaces
interface ChangePasswordModalProps {
  identity: MeResponse;
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
  identity,
  open,
  onClose,
}): JSX.Element => {
  /**
   * Notification hook to show notifications to the user
   */
  const { open: openNotification } = useNotification();

  /**
   * Logout mutation hook;
   * used to logout the user
   */
  const { mutate: logout } = useLogout();

  /**
   * Change password mutation hook;
   * used to change the password of the current user
   * @type {ChangePasswordMutation}
   */
  const {
    mutate: changePassword,
    isLoading: isChangingPassword,
    isError: isChangePasswordError,
    data: changePasswordData,
  } = useCustomMutation<ChangePasswordMutation>();

  /**
   * Handles the form submission
   * @param {FormEvent<HTMLFormElement>} e - The form event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isChangingPassword) return;

    // Get the form data
    const formData: FormData = new FormData(e.currentTarget);
    const oldPassword: string =
      formData.get("current-password")?.toString() || "";
    const newPassword: string = formData.get("new-password")?.toString() || "";
    const confirmPassword: string =
      formData.get("confirm-new-password")?.toString() || "";

    // Check if the new password and confirm new password are the same
    if (newPassword !== confirmPassword)
      return openNotification?.({
        type: "error",
        description: "Error!",
        message: "New password and confirm new password do not match.",
      });

    // Check if the new password is the same as the current password
    if (oldPassword === newPassword)
      return openNotification?.({
        type: "error",
        description: "Error!",
        message: "New password must be different from the current password.",
      });

    // Change the password
    changePassword({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_CHANGE_PASSWORD,
        variables: {
          changePasswordInput: {
            userId: identity.user.id,
            oldPassword,
            newPassword,
            confirmPassword,
          },
        },
      },
      values: {},
    });
  };

  useEffect(() => {
    if (!isChangePasswordError && changePasswordData) {
      // Show a success notification
      openNotification?.({
        type: "success",
        description: "Success!",
        message: "Your password has been changed successfully.",
      });

      // Logout the user
      logout();
    }
  }, [changePasswordData, isChangePasswordError, logout, openNotification]);

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
