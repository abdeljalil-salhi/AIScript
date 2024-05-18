import gql from "graphql-tag";

// Mutation to verify email
export const MUTATION_VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;
