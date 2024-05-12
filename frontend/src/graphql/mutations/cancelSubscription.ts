import gql from "graphql-tag";

// GraphQL mutation to cancel a subscription
export const MUTATION_CANCEL_SUBSCRIPTION = gql`
  mutation CancelSubscription($subscriptionId: String!) {
    cancelSubscription(subscriptionId: $subscriptionId) {
      id
      plan {
        id
        name
        duration
      }
      daysWithService
      isActive
      createdAt
      updatedAt
    }
  }
`;
