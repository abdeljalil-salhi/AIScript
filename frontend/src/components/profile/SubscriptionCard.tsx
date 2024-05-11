// Dependencies
import { FC } from "react";

// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

// Interfaces
interface SubscriptionCardProps {
  identity: MeResponse | undefined;
  isIdentityLoading: boolean;
}

/**
 * SubscriptionCard Component
 *
 * @interface SubscriptionCardProps
 * @returns {JSX.Element} - SubscriptionCard Component
 * @exports SubscriptionCard
 */
export const SubscriptionCard: FC<SubscriptionCardProps> = ({
  identity,
  isIdentityLoading,
}): JSX.Element => {
  return (
    <div className="rounded-lg w-full max-w-96 lg:max-w-2xl p-0.5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl">
      <div className="rounded-[calc(1.5rem-1px)] w-full">
        {isIdentityLoading ? (
          <div className="rounded-lg w-full bg-n-5 px-3.5 py-2.5 text-sm font-light text-n-1 shadow-sm hover:bg-n-5/80 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="animate-pulse bg-n-5/70 h-4 w-1/2 rounded-md mb-1"></div>
            <div className="animate-pulse bg-n-5/70 h-4 w-1/4 rounded-md"></div>
          </div>
        ) : (
          <div className="rounded-lg w-full bg-n-5 px-3.5 py-2.5 text-sm font-light text-n-1 shadow-sm hover:bg-n-5/80 transition-all duration-300 ease-in-out cursor-pointer">
            <div>
              Subscribed to{" "}
              <span className="font-medium">
                AIScript{" "}
                {identity?.user.subscription?.plan?.name.split("-")[0].trim()}
              </span>{" "}
              since{" "}
              {identity?.user.subscription?.createdAt &&
                new Date(
                  identity?.user.subscription?.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              .
            </div>
            {identity?.user.subscription?.isActive ? (
              identity.user.subscription.plan &&
              identity.user.subscription.plan.price > 0 && (
                <div className="text-xs font-light">
                  Next billing date:{" "}
                  <span className="font-medium">
                    {new Date(
                      new Date(identity.user.subscription.createdAt).setMonth(
                        new Date(
                          identity.user.subscription.createdAt
                        ).getMonth() +
                          (identity.user.subscription.daysWithService /
                            identity.user.subscription.plan.duration +
                            1)
                      )
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )
            ) : (
              <div>Subscription will end on </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
