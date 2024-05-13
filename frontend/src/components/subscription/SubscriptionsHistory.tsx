// Dependencies
import { FC, useState } from "react";
import { CustomResponse } from "@refinedev/core";

// Constants
import { checkoutPlans } from "@/constants/checkout";
import { CheckoutPlan } from "@/constants/types";
// GraphQL Types
import { GetSubscriptionsByUserIdQuery } from "@/graphql/types";
import { StarFilled } from "@ant-design/icons";

// Interfaces
interface SubscriptionsHistoryProps {
  subscriptions: CustomResponse<GetSubscriptionsByUserIdQuery>;
}

/**
 * SubscriptionsHistory Component
 *
 * @interface SubscriptionsHistoryProps
 * @returns {JSX.Element} - SubscriptionsHistory Component
 * @exports SubscriptionsHistory
 */
export const SubscriptionsHistory: FC<SubscriptionsHistoryProps> = ({
  subscriptions,
}): JSX.Element => {
  /**
   * State to store the details of the Basic Plan
   * @type {CheckoutPlan}
   */
  const [basicPlan] = useState<CheckoutPlan>(
    checkoutPlans.find((plan: CheckoutPlan) => plan.planId === "")!
  );

  return (
    <div className="max-w-xl w-full flex flex-col gap-5 items-center justify-center">
      {subscriptions.data.getSubscriptionsByUserId.map((subscription) => {
        return (
          <div
            key={subscription.id}
            className={`rounded-lg w-full p-0.5 ${
              basicPlan.id !== subscription.plan!.id
                ? "bg-gradient-to-br from-purple-600 to-blue-500"
                : "bg-n-5 hover:bg-n-5/90"
            }`}
          >
            <div className="rounded-[calc(1.5rem-1px)] w-full">
              <div className="flex flex-col gap-1 w-full bg-n-6 px-4 py-3 rounded-lg shadow-md hover:bg-n-6/90 transition-all duration-300 ease-in-out cursor-pointer">
                <div className="flex flex-row gap-2 items-center justify-start">
                  {basicPlan.id !== subscription.plan!.id ? (
                    <StarFilled className="text-purple-500 text-lg" />
                  ) : (
                    <StarFilled className="text-n-5 text-lg" />
                  )}
                  <h3 className="text-lg font-medium text-n-1">
                    {subscription.plan?.name}
                  </h3>
                </div>
                <p className="text-n-4">
                  {new Date(subscription.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
                  -{" "}
                  {new Date(subscription.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                  {subscription.isActive && (
                    <span className="text-green-600 w-full items-end font-light ml-1">
                      - Active
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
