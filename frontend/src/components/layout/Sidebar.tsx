// Dependencies
import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, ConfigProvider } from "antd";
import { useLogout, useWarnAboutChange } from "@refinedev/core";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

// Assets
import Logo from "@/assets/logo.webp";
// Constants
import { navigationLinks } from "@/constants/sidebar";
import { NavigationLink } from "@/constants/types";

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
      <nav className="flex flex-col items-center justify-between py-6 px-2 sticky t-0 l-0 h-screen z-[9] bg-n-7 min-w-[10rem]">
        <div className="w-full">
          <img
            src={Logo}
            className="max-h-10 mb-4"
            alt="AIScript logo"
            draggable={false}
          />
          <div className="flex flex-col w-full gap-1">
            {navigationLinks.map((item: NavigationLink) => (
              <Link to={item.href} key={item.id} draggable={false}>
                <Button
                  type="text"
                  className="text-start text-base font-grotesk"
                  block
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full px-[15px]">
          <div className="flex flex-col w-full">
            <Link
              to="/pricing"
              className="font-grotesk !text-n-1 hover:underline cursor-pointer"
              draggable={false}
            >
              50 credits
              <br />
              Pricing
            </Link>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="font-grotesk text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer">
              What's new?
            </div>
            <div className="font-grotesk text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer">
              Help / FAQs
            </div>
            <div className="font-grotesk text-n-1 text-xs uppercase tracking-widest hover:underline cursor-pointer">
              Community
            </div>
            <div className="flex flex-row items-center justify-between mt-2 w-full gap-2">
              <Link to="/profile" draggable={false}>
                <Avatar className="cursor-pointer">
                  <UserOutlined />
                </Avatar>
              </Link>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                className="h-full"
                loading={isLoading}
                onClick={handleLogout}
              ></Button>
            </div>
          </div>
        </div>
      </nav>
    </ConfigProvider>
  );
};
