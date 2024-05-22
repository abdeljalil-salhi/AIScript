import gql from "graphql-tag";

// Mutation for logging in with two-factor authentication
export const MUTATION_LOGIN_TWO_FACTOR_AUTHENTICATION = gql`
  mutation LoginTwoFactorAuthentication(
    $loginTwoFactorAuthenticationInput: LoginTwoFactorAuthenticationInput!
  ) {
    loginTwoFactorAuthentication(
      loginTwoFactorAuthenticationInput: $loginTwoFactorAuthenticationInput
    ) {
      shortLivedToken
      accessToken
      refreshToken
      user {
        id
        username
      }
      is2faEnabled
    }
  }
`;
