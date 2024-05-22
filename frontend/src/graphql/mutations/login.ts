import gql from "graphql-tag";

// Mutation to login a user
export const MUTATION_LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      shortLivedToken
      accessToken
      refreshToken
      user {
        id
        username
        isAdmin
        connection {
          email
          isEmailVerified
          is2faEnabled
          provider
          otpCreatedAt
        }
        avatar {
          defaultFilename
          filename
          updatedAt
        }
        wallet {
          balance
          updatedAt
        }
        createdAt
        updatedAt
      }
      is2faEnabled
    }
  }
`;
