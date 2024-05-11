import gql from "graphql-tag";

// Mutation to register a user
export const MUTATION_REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
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
    }
  }
`;
