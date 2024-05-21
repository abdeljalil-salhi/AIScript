import gql from "graphql-tag";

// Mutation for verifying a user's password
export const MUTATION_VERIFY_PASSWORD = gql`
  mutation VerifyPassword($password: String!) {
    verifyPassword(password: $password)
  }
`;
