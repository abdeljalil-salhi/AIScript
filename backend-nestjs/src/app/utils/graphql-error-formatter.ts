// Dependencies
import { GraphQLError, GraphQLFormattedError } from 'graphql';

/**
 * Formats the GraphQL error to a readable format.
 *
 * @param {GraphQLError} error - The GraphQL error.
 * @returns {GraphQLFormattedError} - The formatted GraphQL error.
 */
export const graphQLErrorFormatter = (
  error: GraphQLError,
): GraphQLFormattedError => {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: extractErrorMessage(error.message),
  };

  return graphQLFormattedError;
};

const extractErrorMessage = (errorMessage: string): string => {
  const uniqueConstraintString: string =
    'Unique constraint failed on the fields:';
  const startIndex: number = errorMessage.indexOf(uniqueConstraintString);

  if (startIndex !== -1) {
    const startParenIndex: number = errorMessage.indexOf('(`', startIndex);
    const endParenIndex: number = errorMessage.indexOf('`)', startParenIndex);

    if (startParenIndex !== -1 && endParenIndex !== -1) {
      const field: string = errorMessage
        .substring(startParenIndex + 2, endParenIndex)
        .trim();
      return `${field.charAt(0).toUpperCase() + field.slice(1)} already taken`;
    }
  }

  return errorMessage;
};
