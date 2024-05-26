import gql from "graphql-tag";

// Query to retrieve all book entities by user ID.
export const QUERY_GET_BOOKS_BY_USER_ID = gql`
  query GetBooksByUserId($userId: String!) {
    getBooksByUserId(userId: $userId) {
      id
      ownerId
      author
      title
      topic
      targetAudience
      numChapters
      numSubsections
      cover
      document
      pdf
      createdAt
      updatedAt
    }
  }
`;
