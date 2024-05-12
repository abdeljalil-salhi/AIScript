import gql from "graphql-tag";

// Mutation to subscribe to a plan
export const MUTATION_SUBSCRIBE = gql`
  mutation Subscribe($subscribeInput: SubscribeInput!) {
    subscribe(subscribeInput: $subscribeInput) {
      id
      userId
      amount
      orderId
      paypalSubId
      paymentSource
      facilitatorAccessToken
      subscriptionId
      createdAt
      updatedAt
    }
  }
`;
