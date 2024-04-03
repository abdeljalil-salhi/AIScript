// Dependencies
import { AuthBindings } from "@refinedev/core";
import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
} from "@refinedev/core/dist/interfaces";

// Utils
import { API_URL, dataProvider } from "../data";

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
export const authProvider: AuthBindings = {
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
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: {
            registerInput: {
              email,
              username,
              password,
              filename: "default.png",
            },
          },
          rawQuery: `
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
            `,
        },
      });

      // Save the accessToken in localStorage
      localStorage.setItem("access_token", data.register.accessToken);

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (e) {
      const error = e as Error;

      console.error(error);

      return {
        success: false,
        error: {
          message: "Something went wrong",
          name: error.message.includes("Unique constraint failed on the fields")
            ? "Email or username already exists"
            : "User registration failed",
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
      const { data } = await dataProvider.custom({
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
          rawQuery: `
            mutation Login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
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
          `,
        },
      });

      // Save the accessToken in localStorage
      localStorage.setItem("access_token", data.login.accessToken);

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login Error",
          name: "name" in error ? error.name : "Invalid credentials",
        },
      };
    }
  },

  /**
   * This function is called when the user clicks the logout button
   * @returns {Promise<AuthActionResponse>}
   */
  logout: async (): Promise<AuthActionResponse> => {
    // Simply remove the accessToken from localStorage to logout the user
    localStorage.removeItem("access_token");

    // Call the logout mutation\
    // This is to logout the user from the server
    await dataProvider.custom({
      url: API_URL,
      method: "post",
      headers: {},
      meta: {
        rawQuery: `
          mutation Logout {
            logout {
              isLoggedOut
            }
          }
        `,
      },
    });

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
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
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
                  createdAt
                  updatedAt
                }
              }
            }
          `,
        },
      });

      // If the user is authenticated, redirect to the dashboard
      return {
        authenticated: true,
        redirectTo: "/dashboard",
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
      const { data } = await dataProvider.custom<{ me: any }>({
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
          rawQuery: `
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
                  createdAt
                  updatedAt
                }
              }
            }
          `,
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
