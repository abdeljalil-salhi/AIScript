import gql from "graphql-tag";

// Requests an email verification for the specified email.
export const MUTATION_REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification(
    $requestEmailVerificationInput: RequestEmailVerificationInput!
  ) {
    requestEmailVerification(
      requestEmailVerificationInput: $requestEmailVerificationInput
    ) {
      id
      email
      expiresAt
      createdAt
      updatedAt
    }
  }
`;
