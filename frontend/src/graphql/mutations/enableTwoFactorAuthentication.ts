import gql from "graphql-tag";

// Mutation to enable two-factor authentication (2FA)
export const MUTATION_ENABLE_TWO_FACTOR_AUTHENTICATION = gql`
  mutation EnableTwoFactorAuthentication($userId: String!, $otp: String!) {
    enableTwoFactorAuthentication(userId: $userId, otp: $otp) {
      status
      connection {
        id
        email
        isEmailVerified
        is2faEnabled
        provider
        otpCreatedAt
      }
    }
  }
`;
