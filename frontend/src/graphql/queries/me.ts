import gql from "graphql-tag";

// Query to get the current user
export const QUERY_ME = gql`
  query Me {
    me {
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
        subscription {
          plan {
            id
            name
            price
            duration
            createdAt
          }
          daysWithService
          isActive
          createdAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
