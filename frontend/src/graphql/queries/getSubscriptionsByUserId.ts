import gql from "graphql-tag";

// Query to get the subscriptions of a user
export const QUERY_GET_SUBSCRIPTIONS_BY_USER_ID = gql`
  query GetSubscriptionsByUserId($userId: String!) {
    getSubscriptionsByUserId(userId: $userId) {
      id
      isActive
      isDeactivated
      daysWithService
      createdAt
      updatedAt
      plan {
        id
        name
        createdAt
      }
    }
  }
`;
