import gql from "graphql-tag";

// Mutation to delete a book entity by ID.
export const MUTATION_DELETE_BOOK_BY_ID = gql`
  mutation DeleteBookById($bookId: String!) {
    deleteBookById(bookId: $bookId) {
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
