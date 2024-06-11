import gql from "graphql-tag";

// Query to retrieve all showcase books.
export const QUERY_GET_SHOWCASE_BOOKS = gql`
  query GetShowcaseBooks {
    getShowcaseBooks {
      id
      ownerId
      owner {
        username
      }
      author
      title
      topic
      cover
      targetAudience
      numChapters
      numSubsections
      cover
      document
      pdf
      isShowcase
      createdAt
      updatedAt
    }
  }
`;
