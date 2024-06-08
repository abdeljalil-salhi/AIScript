// Dependencies
import { AuthProvider } from "@refinedev/core";

// Utils
import { API_URL, dataProvider } from "../data";
// GraphQL Queries
import { QUERY_ME } from "@/graphql/queries/me";
// GraphQL Mutations
import { MUTATION_REGISTER } from "@/graphql/mutations/register";
import { MUTATION_LOGIN } from "@/graphql/mutations/login";
import { MUTATION_LOGOUT } from "@/graphql/mutations/logout";
// GraphQL Types
import {
  LoginMutation,
  LogoutMutation,
  MeQuery,
  RegisterMutation,
} from "@/graphql/types";
// Types
import { AuthActionResponse, CheckResponse, OnErrorResponse } from "./types";

/**
 * @description
 * The websocket connection.
 * It is initialized with the URL of the websocket server.
 * The connection is not established automatically, but it is configured to upgrade from HTTP to WebSocket.
 * If the websocket transport is not supported, the connection reverts to classic polling.
 */
import { ws } from "@/sockets";

// Types
type AuthCredentials = {
  email: string;
  username: string;
  password: string;
};
type LoginParams = {
  usernameOrEmail: string;
  password: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnErrorParams = any;

/**
 * Credentials used to login for testing purposes
 * @type {AuthCredentials}
 * @exports authCredentials
 */
export const loginCredentials: LoginParams = {
  usernameOrEmail: "demo@aiscript.com",
  password: "demodemo",
};

/**
 * This provider is used to login, logout, check if the user is authenticated, and get the user information.
 * @type {AuthBindings}
 * @see https://refine.dev/docs/authentication/auth-provider/
 * @exports authProvider
 */
export const authProvider: AuthProvider = {
  /**
   * This function is called when the user submits the register form
   *
   * @param {AuthCredentials} params
   * @returns {Promise<AuthActionResponse>}
   */
  register: async ({
    email,
    username,
    password,
  }: AuthCredentials): Promise<AuthActionResponse> => {
    try {
      /**
       * Call the register mutation
       * `dataProvider.custom` is used to make a custom request to the GraphQL API
       * This will call `dataProvider` which will go through the `fetchWrapper` function
       *
       * @see dataProvider.custom
       */
      const { data } = await dataProvider.custom<RegisterMutation>({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: {
            registerInput: {
              email,
              username,
              password,
              filename: "/default.png",
            },
          },
          rawQuery: MUTATION_REGISTER,
        },
      });

      // Save the accessToken in localStorage
      localStorage.setItem("access_token", data.register.accessToken);

      return {
        success: true,
        redirectTo: "/home",
      };
    } catch (e) {
      const error = e as Error;

      console.log(error);

      return {
        success: false,
        error: {
          message: "Something went wrong",
          name:
            "message" in error
              ? error.message
              : "An error occurred while registering. Please try again.",
        },
      };
    }
  },

  /**
   * This function is called when the user submits the login form
   *
   * @param {LoginParams} params
   * @returns {Promise<AuthActionResponse>}
   */
  login: async ({
    usernameOrEmail,
    password,
  }: LoginParams): Promise<AuthActionResponse> => {
    try {
      /**
       * Call the login mutation
       * `dataProvider.custom` is used to make a custom request to the GraphQL API
       * This will call `dataProvider` which will go through the `fetchWrapper` function
       *
       * @see dataProvider.custom
       */
      const { data } = await dataProvider.custom<LoginMutation>({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: {
            loginInput: {
              usernameOrEmail,
              password,
            },
          },
          rawQuery: MUTATION_LOGIN,
        },
      });

      /**
       * Check if two-factor authentication is enabled
       * If it is enabled, get the shortLivedToken and redirect to the 2FA page
       */
      if (data.login.is2faEnabled) {
        // Save the shortLivedToken in localStorage
        localStorage.setItem("short_lived_token", data.login.shortLivedToken!);

        return {
          success: true,
          redirectTo: "/2fa",
        };
      }

      // Save the accessToken in localStorage
      localStorage.setItem("access_token", data.login.accessToken);

      return {
        success: true,
        redirectTo: "/home",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "Something went wrong",
          name:
            "message" in error
              ? error.message
              : "An error occurred while logging in. Please try again.",
        },
      };
    }
  },

  /**
   * This function is called when the user clicks the logout button
   * @returns {Promise<AuthActionResponse>}
   */
  logout: async (): Promise<AuthActionResponse> => {
    // Call the logout mutation;
    // This is to log out the user from the server
    await dataProvider.custom<LogoutMutation>({
      url: API_URL,
      method: "post",
      headers: {},
      meta: {
        rawQuery: MUTATION_LOGOUT,
      },
    });

    // Then remove the accessToken from localStorage
    localStorage.removeItem("access_token");

    // Disconnect the websocket connection
    ws.disconnect();

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  /**
   * This function is called when the user tries to access a page that requires authentication
   * @param {OnErrorParams} error
   * @returns {Promise<OnErrorResponse>}
   */
  onError: async (error: OnErrorParams): Promise<OnErrorResponse> => {
    // Check to see if the error is an authentication error
    // If so, set logout to true
    if (error.statusCode === "UNAUTHENTICATED")
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };

    return { error };
  },

  /**
   * This function is called when the user tries to access a page that requires authentication
   * @returns {Promise<CheckResponse>}
   */
  check: async (): Promise<CheckResponse> => {
    try {
      // Get the identity of the user
      // This is to know if the user is authenticated or not
      await dataProvider.custom<MeQuery>({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: QUERY_ME,
        },
      });

      // If the user is authenticated, redirect to the home page
      return {
        authenticated: true,
        redirectTo: "/home",
      };
    } catch (error) {
      // For testing purposes, if the user is using the test credentials, redirect to the home page
      //   if (localStorage.getItem("access_token") === "access_token") {
      //     return {
      //       authenticated: true,
      //       redirectTo: "/",
      //     };
      //   }

      // For any other error, redirect to the login page
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
        error: {
          message: "You need to login to access this page",
          name: "Unauthorized",
        },
      };
    }
  },

  /**
   * This function is called to get the user information
   * @returns {Promise<unknown>}
   */
  getIdentity: async (): Promise<unknown> => {
    const accessToken: string | null = localStorage.getItem("access_token");

    try {
      /**
       * Call the `me` query to get the user information
       * I'm using me:any because the GraphQL API doesn't have a type for the me query yet.
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await dataProvider.custom<MeQuery>({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
              // Send the accessToken in the Authorization header
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        meta: {
          // Get the user information such as id, username, email, etc.
          rawQuery: QUERY_ME,
        },
      });

      return data.me;
    } catch (error) {
      return undefined;
    }
  },

  /**
   * This function is called to get the user permissions
   * @returns {Promise<unknown>}
   */
  getPermissions: async (): Promise<unknown> => {
    throw new Error("Method not implemented.");
  },

  /**
   * This function is called when the user clicks the forgot password button
   * @returns {Promise<AuthActionResponse>}
   */
  forgotPassword: async (): Promise<AuthActionResponse> => {
    throw new Error("Method not implemented.");
  },

  /**
   * This function is called when the user submits the reset password form
   * @returns {Promise<AuthActionResponse>}
   */
  updatePassword: async (): Promise<AuthActionResponse> => {
    throw new Error("Method not implemented.");
  },
};
