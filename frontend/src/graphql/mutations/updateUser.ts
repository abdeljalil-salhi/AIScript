import gql from "graphql-tag";

// Mutation to update the user's information.
export const MUTATION_UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      username
      connection {
        email
      }
      createdAt
      updatedAt
    }
  }
`;
