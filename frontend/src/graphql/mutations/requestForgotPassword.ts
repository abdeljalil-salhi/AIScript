import gql from "graphql-tag";

// Mutation for requesting a forgot password token for the specified email.
export const MUTATION_REQUEST_FORGOT_PASSWORD = gql`
  mutation RequestForgotPassword(
    $requestForgotPasswordInput: RequestForgotPasswordInput!
  ) {
    requestForgotPassword(
      requestForgotPasswordInput: $requestForgotPasswordInput
    ) {
      id
      email
      expiresAt
      createdAt
      updatedAt
    }
  }
`;
