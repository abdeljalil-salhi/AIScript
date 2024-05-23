// Dependenices
import { createClient, Client } from "graphql-ws";
import graphqlDataProvider, {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";

// Utils
import fetchWrapper from "./fetch-wrapper";

export const BASE_URL = import.meta.env.VITE_API_URL as string;
export const API_URL = import.meta.env.VITE_API_URL_GQL as string;
export const WS_URL = import.meta.env.VITE_API_URL_WS as string;

/**
 * Client for making GraphQL requests.
 *
 * @type {GraphQLClient}
 * @exports client
 */
export const client: GraphQLClient = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

/**
 * Client for making GraphQL subscriptions (using graphql-ws).
 * Note: This client is only available in the browser.
 *
 * @type {Client | null}
 * @exports wsClient
 */
export const wsClient: Client | null =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");

          return {
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          };
        },
      })
    : null;

/**
 * Data provider for Refine.
 * This provider is used for all data fetching and mutations.
 *
 * @type {Required<IDataContextProvider>}
 * @see https://refine.dev/docs/data/data-provider/
 * @exports dataProvider
 */
export const dataProvider = graphqlDataProvider(client);

/**
 * Live provider for Refine.
 * This provider is used for all GraphQL subscriptions.
 *
 * @type {ILiveContext}
 * @see https://refine.dev/docs/realtime/live-provider/
 * @exports liveProvider
 */
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;
