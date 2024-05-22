// Dependencies
import { GraphQLFormattedError } from "graphql";

// Types
type Error = {
  message: string;
  statusCode: string;
};

/**
 * Custom fetch function that adds the access token to the request headers and
 * sets the content type to application/json.
 * If the operation is LoginTwoFactorAuthentication, the short-lived token is used instead.
 * This function is used to make requests to the GraphQL API.
 *
 * @param {string} url - The url to fetch.
 * @param {RequestInit} options - The options to pass to the fetch function.
 * @returns {Promise<Response>} - The response from the fetch function.
 */
const customFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  let usedToken: string | null = null;

  const shortLivedToken: string | null =
    localStorage.getItem("short_lived_token");

  const accessToken: string | null = localStorage.getItem("access_token");

  const opts = JSON.parse(options.body?.toString() || "{}");

  if (opts.operationName === "LoginTwoFactorAuthentication")
    usedToken = shortLivedToken;

  const headers = options.headers as Record<string, string>;

  return fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: `Bearer ${usedToken || accessToken}`,
      "Content-Type": "application/json",
      "Apollo-Require-Preflight": "true",
    },
  });
};

/**
 * Parses the errors from the GraphQL response.
 *
 * @param {Record<"errors", GraphQLFormattedError[] | undefined>} body - The response body.
 * @returns {Error | null} - The error object or null if no errors were found.
 */
const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: "Unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("errors" in body) {
    const errors = body.errors;

    const messages = errors?.map((error) => error.message)?.join("");
    const statusCode = errors?.[0]?.extensions?.code;

    return {
      message: messages || JSON.stringify(errors),
      statusCode: statusCode || 500,
    };
  }

  return null;
};

/**
 * Wrapper around the fetch function that handles the errors returned from the
 * GraphQL API.
 *
 * @param {string} url - The url to fetch.
 * @param {RequestInit} options - The options to pass to the fetch function.
 * @returns {Promise<Response>} - The response from the fetch function.
 */
const fetchWrapper = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const response: Response = await customFetch(url, options);

  const responseClone = response.clone();
  const body = await responseClone.json();

  const error: Error | null = getGraphQLErrors(body);

  if (error) throw error;

  return response;
};

export default fetchWrapper;
