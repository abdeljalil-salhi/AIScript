import gql from "graphql-tag";

// Mutation to disable two-factor authentication (2FA)
export const MUTATION_DISABLE_TWO_FACTOR_AUTHENTICATION = gql`
  mutation DisableTwoFactorAuthentication($userId: String!, $otp: String!) {
    disableTwoFactorAuthentication(userId: $userId, otp: $otp) {
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
