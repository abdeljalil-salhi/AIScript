import gql from "graphql-tag";

// Mutation for changing the password of the current user.
export const MUTATION_CHANGE_PASSWORD = gql`
  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`;
