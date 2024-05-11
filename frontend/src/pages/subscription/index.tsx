// Dependencies
import { FC } from "react";

// Interfaces
interface SubscriptionPageProps {}

/**
 * Subscription Page Component
 *
 * @interface SubscriptionPageProps
 * @returns {JSX.Element} - Subscription Page Component
 * @exports SubscriptionPage
 */
export const SubscriptionPage: FC<SubscriptionPageProps> = (): JSX.Element => {
  return (
    <div className="p-4 md:p-6 w-full h-[calc(100vh-3.5rem)] md:h-screen flex flex-col gap-6 overflow-y-auto">
      subscription page
    </div>
  );
};
