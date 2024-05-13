// Dependencies
import { FC } from "react";
import { useCustomMutation, useGetIdentity } from "@refinedev/core";

// Components
import { Header } from "@/components/subscription/cancel/Header";
import { SubscriptionSummary } from "./SubscriptionSummary";
// GraphQL Mutations
import { MUTATION_CANCEL_SUBSCRIPTION } from "@/graphql/mutations/cancelSubscription";
// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";
import { CancelSubscriptionMutation } from "@/graphql/types";
// Providers
import { API_URL } from "@/providers";

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
  /**
   * Unsubscribe mutation to cancel the user's subscription
   * @type {useCustomMutation}
   */
  const {
    mutate: unsubscribe,
    isLoading: isUnsubscribing,
    isError: unsubscribeError,
  } = useCustomMutation<CancelSubscriptionMutation>();

  /**
   * Get the user's identity
   * @type {MeResponse}
   */
  const { data: identity, isLoading: isIdentityLoading } =
    useGetIdentity<MeResponse>();

  /**
   * Handle the unsubscribe action to cancel the user's subscription
   * @function
   * @returns {Promise<void>}
   */
  const handleUnsubscribe = async (): Promise<void> => {
    if (
      isUnsubscribing ||
      isIdentityLoading ||
      !identity?.user.subscription?.id
    ) {
      return;
    }

    unsubscribe({
      url: API_URL,
      method: "post",
      meta: {
        gqlMutation: MUTATION_CANCEL_SUBSCRIPTION,
        variables: {
          subscriptionId: identity.user.subscription.id,
        },
      },
      values: {},
    });

    window.location.reload();
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-5 font-['Poppins'] flex flex-col items-center">
      <Header />

      <div className="w-full bg-white border-t border-b xl:border xl:rounded-md border-gray-200 px-5 py-10 text-gray-800 flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-full max-w-7xl">
          <div className="-mx-3 md:flex items-start">
            <SubscriptionSummary />

            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <h4>Are you sure you want to cancel your subscription?</h4>

                <button
                  onClick={handleUnsubscribe}
                  className="w-full bg-red-500 text-base text-white font-semibold py-3 mt-3 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
                  disabled={
                    isUnsubscribing ||
                    isIdentityLoading ||
                    !identity?.user.subscription?.isActive
                  }
                >
                  {isUnsubscribing
                    ? "Cancelling..."
                    : isIdentityLoading ||
                      !identity?.user.subscription?.isActive
                    ? "Subscription Canceled"
                    : "Cancel Subscription"}
                </button>

                <div className="text-sm text-gray-400 mt-3">
                  By confirming, you will lose access to all premium features
                  and your subscription will be canceled at the end of the
                  current billing cycle. You can always resubscribe later.
                </div>

                {unsubscribeError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
                    <strong className="font-bold mr-1">Holy smokes!</strong>
                    <span className="block sm:inline">
                      Something bad happened, retry.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
