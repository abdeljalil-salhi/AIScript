// Dependencies
import { FC } from "react";
import { Spin } from "antd";
import { createPortal } from "react-dom";
import { useLogout, useWarnAboutChange } from "@refinedev/core";

// Components
import { Backdrop } from "./Backdrop";
import { Link } from "react-router-dom";

// Interfaces
interface DropdownModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dropdown Modal Component
 *
 * @interface DropdownModalProps
 * @returns {JSX.Element} - Dropdown Modal Component
 * @exports DropdownModal
 */
export const DropdownModal: FC<DropdownModalProps> = ({
  open,
  onClose,
}): JSX.Element => {
  /**
   * Warn about changes hook;
   * used to warn users about unsaved changes when navigating away from the page/loggin out
   */
  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  /**
   * Logout mutation hook;
   * used to logout the user
   */
  const { mutate: logout, isLoading } = useLogout();

  /**
   * Handle logout when user clicks on the logout button
   * @returns {void}
   */
  const handleLogout = (): void => {
    if (warnWhen) {
      const confirm: boolean = window.confirm(
        "Are you sure you want to leave? You have unsaved changes."
      );

      if (confirm) {
        setWarnWhen(false);
        logout();
      }
    } else logout();
  };

  // If the dropdown is not open, return an empty fragment
  if (!open) return <></>;

  return createPortal(
    <>
      <Backdrop onClick={onClose} />
      <div className="z-20 block md:hidden bg-n-7 divide-y divide-n-6/70 rounded-lg shadow absolute bottom-[3.75rem] right-1">
        <div className="px-4 py-3 text-sm text-n-2">
          <Link to="/profile">
            <div className="w-full">Abdeljalil Salhi</div>
            <div className="w-full font-medium truncate">
              abdel@aiscript.com
            </div>
          </Link>
        </div>
        <div className="py-2 text-sm text-n-1 font-['Poppins']">
          <div className="block px-4 py-2 hover:bg-n-6 transition-all duration-200 ease-in-out cursor-pointer">
            What's new?
          </div>
          <div className="block px-4 py-2 hover:bg-n-6 transition-all duration-200 ease-in-out cursor-pointer">
            Help / FAQs
          </div>
          <div className="block px-4 py-2 hover:bg-n-6 transition-all duration-200 ease-in-out cursor-pointer">
            Community
          </div>
        </div>
        <div className="py-2">
          <button
            className="w-full flex px-4 py-2 text-sm text-red-500 hover:text-red-600 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="z-30 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-n-7 bg-opacity-50">
          <Spin />
        </div>
      )}
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};
