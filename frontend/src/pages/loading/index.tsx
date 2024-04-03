// Dependencies
import { FC } from "react";
import { Spin } from "antd";

// Interfaces
interface LoadingPageProps {}

/**
 * Loading Page Component
 *
 * @interface LoadingPageProps
 * @returns {JSX.Element} - Loading Page Component
 * @exports LoadingPage
 */
export const LoadingPage: FC<LoadingPageProps> = (): JSX.Element => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spin />
    </div>
  );
};
