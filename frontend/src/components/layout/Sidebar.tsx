// Dependencies
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useGetIdentity, useLogout, useWarnAboutChange } from "@refinedev/core";

// Assets
import { AIScriptLogo, AIScriptNoText } from "@/assets";
// Components
import { DropdownModal } from "./DropdownModal";
// Constants
import { navigationLinks } from "@/constants/sidebar";
import { NavigationLink } from "@/constants/types";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

/**
 * @description
 * The websocket connection.
 * It is used to emit and listen to events.
 * @type {Socket<ServerToClientEvents, ClientToServerEvents>}
 */
import { ws } from "@/sockets";

// Interfaces
interface SidebarProps {}

/**
 * Sidebar Component
 *
 * @interface SidebarProps
 * @returns {JSX.Element} - Sidebar Component
 * @exports Sidebar
 */
export const Sidebar: FC<SidebarProps> = (): JSX.Element => {
  /**
   * Warn about changes hook;
   * used to warn users about unsaved changes when navigating away from the page/loggin out
   */
  const { warnWhen, setWarnWhen } = useWarnAboutChange();

  /**
   * Logout mutation hook;
   * used to logout the user
   */
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const {
    data: identity,
    isLoading: isIdentityLoading,
    refetch: refetchIdentity,
  } = useGetIdentity<MeResponse>();

  /**
   * Dropdown state to toggle the dropdown menu
   * @type {boolean}
   * @default false
   */
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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

  /**
   * Listen for book creation and refetch the identity
   */
  useEffect(() => {
    ws.on("bookCreated", () => {
      refetchIdentity();
    });
  }, [refetchIdentity]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            // Variables declared in index.css
            textHoverBg: "var(--sb-text-hover-bg)",
            colorBgTextActive: "var(--sb-text-hover-bg)",
            colorLinkHover: "var(--sb-color-link-hover)",
            colorLinkActive: "var(--sb-color-link-hover)",
          },
        },
      }}
    >
      <nav className="flex flex-row md:flex-col items-center justify-between py-0 md:py-6 px-4 md:px-2 sticky bottom-0 md:top-0 left-0 h-[3.5rem] md:h-screen z-[9] bg-n-7 min-w-0 w-screen md:w-fit md:min-w-[10rem]">
        <div className="w-full flex flex-row md:flex-col justify-between items-center">
          <Link to="/home" draggable={false}>
            <img
              src={AIScriptLogo}
              className="max-h-10 mb-4 hidden md:block"
              alt="AIScript Logo"
              draggable={false}
            />
            <img
              src={AIScriptNoText}
              className="max-h-9 aspect-square block md:hidden"
              alt="AIScript Logo"
              draggable={false}
            />
          </Link>
          <div className="flex flex-row md:flex-col w-fit md:w-full gap-1">
            {navigationLinks.map((item: NavigationLink) => (
              <Link to={item.href} key={item.id} draggable={false}>
                <Button
                  type="text"
                  className="text-start text-xs sm:text-sm md:text-base font-['Poppins']"
                  block
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
          <div className="relative">
            <button
              type="button"
              className="flex md:hidden rounded-full focus:ring-4 focus:ring-n-6"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="sr-only">Open user menu</span>
              {isIdentityLoading ? (
                <div className="w-8 aspect-square p-1 rounded-full ring-2 ring-n-5 bg-n-6 animate-pulse"></div>
              ) : (
                <img
                  src={identity?.user.avatar?.filename}
                  alt={`${identity?.user.username}'s profile`}
                  className="w-8 aspect-square cursor-pointer object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              )}
            </button>
            <DropdownModal
              open={showDropdown}
              onClose={() => setShowDropdown(false)}
              identity={identity}
              isIdentityLoading={isIdentityLoading}
            />
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-8 w-full px-[15px]">
          <div className="flex flex-col w-full">
            <Link
              to="/pricing"
              className="font-grotesk !text-n-1 hover:underline cursor-pointer"
              draggable={false}
            >
              <p>
                {isIdentityLoading ? "___" : identity?.user.wallet?.balance}{" "}
                credits
              </p>
              <p>Pricing</p>
            </Link>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Link
              to="/contact"
              className="font-grotesk text-n-1 hover:text-n-1 active:text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer"
              draggable={false}
            >
              Contact Us
            </Link>
            <Link
              to="/FAQs"
              className="font-grotesk text-n-1 hover:text-n-1 active:text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer"
              draggable={false}
            >
              Help / FAQs
            </Link>
            <div className="font-grotesk text-n-1 hover:text-n-1 active:text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer">
              Community
            </div>
            <div className="flex flex-row items-center justify-between mt-2 w-full gap-2">
              <Link to="/profile" draggable={false}>
                {isIdentityLoading ? (
                  <div className="w-8 aspect-square p-1 rounded-full ring-2 ring-n-5 bg-n-6 animate-pulse"></div>
                ) : (
                  <img
                    src={identity?.user.avatar?.filename}
                    alt={`${identity?.user.username}'s profile`}
                    className="w-8 aspect-square cursor-pointer object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
              </Link>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                className="h-full"
                loading={isLoggingOut}
                onClick={handleLogout}
              ></Button>
            </div>
          </div>
        </div>
      </nav>
    </ConfigProvider>
  );
};
