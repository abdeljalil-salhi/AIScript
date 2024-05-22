import gql from "graphql-tag";

// Mutation for generating a two-factor authentication secret
export const MUTATION_GENERATE_TWO_FACTOR_AUTHENTICATION_SECRET = gql`
  mutation GenerateTwoFactorAuthenticationSecret(
    $userId: String!
    $username: String!
  ) {
    generateTwoFactorAuthenticationSecret(
      userId: $userId
      username: $username
    ) {
      status
      otpAuthUri
    }
  }
`;
