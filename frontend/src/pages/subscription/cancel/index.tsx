// Dependencies
import { FC } from "react";

// Interfaces
interface SubscriptionCancelPageProps {}

/**
 * Subscription Cancel Page Component
 *
 * @interface SubscriptionCancelPageProps
 * @returns {JSX.Element} - Subscription Cancel Page Component
 * @exports SubscriptionCancelPage
 */
export const SubscriptionCancelPage: FC<
  SubscriptionCancelPageProps
> = (): JSX.Element => {
  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      subscription cancel page
    </div>
  );
};
