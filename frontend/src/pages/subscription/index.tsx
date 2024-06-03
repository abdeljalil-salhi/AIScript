// Dependencies
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useCustom, useGetIdentity } from "@refinedev/core";
import { useDocumentTitle } from "@refinedev/react-router-v6";

// Components
import { Header } from "@/components/subscription/Header";
import { SubscriptionsHistory } from "@/components/subscription/SubscriptionsHistory";
// GraphQL Queries
import { QUERY_GET_SUBSCRIPTIONS_BY_USER_ID } from "@/graphql/queries/getSubscriptionsByUserId";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
import { GetSubscriptionsByUserIdQuery } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";

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
  useDocumentTitle("AIScript - Your Subscriptions History");

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity } = useGetIdentity<MeResponse>();

  /**
   * Get the subscriptions of the user
   * @type {GetSubscriptionsByUserIdQuery}
   */
  const {
    data: subscriptions,
    isLoading: isSubscriptionsLoading,
    isError: isSubscriptionsError,
    error: subscriptionsError,
  } = useCustom<GetSubscriptionsByUserIdQuery>({
    url: API_URL,
    method: "post",
    meta: {
      gqlQuery: QUERY_GET_SUBSCRIPTIONS_BY_USER_ID,
      variables: {
        userId: identity?.user.id,
      },
    },
  });

  return (
    <>
      <Helmet>
        <title>AIScript - Your Subscriptions History</title>
        <meta
          name="description"
          content="View your subscriptions history and manage your subscription plans."
        />
      </Helmet>

      <div className="p-4 md:p-6 w-full md:h-screen flex flex-col items-center gap-6 overflow-y-auto font-['Poppins']">
        <Header />

        {!isSubscriptionsLoading ? (
          isSubscriptionsError ? (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-n-6">{subscriptionsError?.message}</p>
            </div>
          ) : (
            <SubscriptionsHistory subscriptions={subscriptions} />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-n-6">Fetching subscriptions...</p>
          </div>
        )}
      </div>
    </>
  );
};
