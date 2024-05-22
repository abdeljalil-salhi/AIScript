import gql from "graphql-tag";

// Mutation for logging out
export const MUTATION_LOGOUT = gql`
  mutation Logout {
    logout {
      isLoggedOut
    }
  }
`;
