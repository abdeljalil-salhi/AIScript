// GraphQL Types
import { MeResponse } from "@/graphql/schema.types";

/**
 * Get the next billing date from the user's identity
 *
 * @param {MeResponse} identity - User's identity
 * @returns {string | undefined} - Next billing date
 */
export const nextBillingDateFromIdentity = (
  identity: MeResponse | undefined
): string | undefined => {
  if (!identity) return;

  if (identity.user.subscription?.plan?.duration === 30)
    return (
      identity?.user.subscription?.createdAt &&
      new Date(
        new Date(identity.user.subscription.createdAt).setMonth(
          new Date(identity.user.subscription.createdAt).getMonth() +
            identity.user.subscription.daysWithService /
              identity.user.subscription.plan!.duration +
            1
        )
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  else if (identity.user.subscription?.plan?.duration === 365)
    return (
      identity?.user.subscription?.createdAt &&
      new Date(
        new Date(identity.user.subscription.createdAt).setFullYear(
          new Date(identity.user.subscription.createdAt).getFullYear() +
            identity.user.subscription.daysWithService /
              identity.user.subscription.plan!.duration +
            1
        )
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
};
