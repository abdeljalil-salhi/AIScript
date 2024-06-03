import gql from "graphql-tag";

// Mutation to reset the user password
export const MUTATION_FORGOT_PASSWORD = gql`
  mutation ForgotPassword(
    $verifyForgotPasswordInput: VerifyForgotPasswordInput!
  ) {
    forgotPassword(verifyForgotPasswordInput: $verifyForgotPasswordInput) {
      user {
        id
      }
    }
  }
`;
