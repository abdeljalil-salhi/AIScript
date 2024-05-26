import gql from "graphql-tag";

// Query to retrieve a book entity by ID.
export const QUERY_GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: String!) {
    getBookById(bookId: $bookId) {
      id
      owner {
        id
        username
        createdAt
      }
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
