export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
};

export type AuthResponse = {
  /** Access token of the user */
  accessToken: Scalars["String"]["output"];
  /** Refresh token of the user */
  refreshToken: Scalars["String"]["output"];
  /** User details */
  user: User;
};

export type Avatar = {
  /** Date and time of the avatar creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Default file name of the avatar */
  defaultFilename: Scalars["String"]["output"];
  /** File name of the avatar */
  filename: Scalars["String"]["output"];
  /** Unique identifier of the avatar */
  id: Scalars["String"]["output"];
  /** Date and time of the avatar last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Avatar associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the avatar */
  userId: Scalars["String"]["output"];
};

export type Connection = {
  /** Date and time of the connection creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Email of the connection */
  email: Scalars["String"]["output"];
  /** Unique identifier of the connection */
  id: Scalars["String"]["output"];
  /** Indicates whether 2FA is enabled for the connection */
  is2faEnabled: Scalars["Boolean"]["output"];
  /** Indicates whether email is verified for the connection */
  isEmailVerified: Scalars["Boolean"]["output"];
  /** One-time password associated with the connection */
  otp?: Maybe<Scalars["String"]["output"]>;
  /** The date and time when the connection one-time password was created */
  otpCreatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Password of the connection */
  password?: Maybe<Scalars["String"]["output"]>;
  /** Provider of the connection */
  provider: Scalars["String"]["output"];
  /** Date and time of the connection last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Connection associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the connection */
  userId: Scalars["String"]["output"];
};

export type LoginInput = {
  /** Password of the user */
  password: Scalars["String"]["input"];
  /** Username or email of the user */
  usernameOrEmail: Scalars["String"]["input"];
};

export type LogoutResponse = {
  /** Indicates whether the user has been successfully logged out. */
  isLoggedOut: Scalars["Boolean"]["output"];
};

export type MeResponse = {
  /** User details */
  user: User;
};

export type Mutation = {
  /** Logs in a user with the specified details. */
  login: AuthResponse;
  /** Logs out a user with the specified user ID. */
  logout: LogoutResponse;
  /** Generates new access and refresh tokens for a user. */
  refresh: NewTokensResponse;
  /** Registers a new user with the specified details. */
  register: AuthResponse;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type NewTokensResponse = {
  /** JSON Web Token (JWT) used for authorization and access */
  accessToken: Scalars["String"]["output"];
  /** Token for refreshing the JSON Web Token (JWT) when it expires */
  refreshToken: Scalars["String"]["output"];
};

export type Query = {
  /** A simple hello world query to test the GraphQL API. */
  hello: Scalars["String"]["output"];
  /** Returns the currently authenticated user. */
  me: MeResponse;
};

export type RegisterInput = {
  /** Email of the user */
  email: Scalars["String"]["input"];
  /** Filename of the avatar */
  filename: Scalars["String"]["input"];
  /** Password of the user */
  password: Scalars["String"]["input"];
  /** Username of the user */
  username: Scalars["String"]["input"];
};

export type User = {
  /** User associated avatar entity */
  avatar?: Maybe<Avatar>;
  /** User associated connection entity */
  connection?: Maybe<Connection>;
  /** Date and time of the user creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Unique identifier of the user */
  id: Scalars["String"]["output"];
  /** Indicates whether the user is an admin */
  isAdmin: Scalars["Boolean"]["output"];
  /** Refresh token of the user */
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  /** Date and time of the user last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Username of the user */
  username: Scalars["String"]["output"];
  /** User associated wallet entity */
  wallet?: Maybe<Wallet>;
};

export type Wallet = {
  /** Balance of the wallet */
  balance: Scalars["Float"]["output"];
  /** Date and time of the wallet creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Unique identifier of the wallet */
  id: Scalars["String"]["output"];
  /** Date and time of the wallet last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Wallet associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the wallet */
  userId: Scalars["String"]["output"];
};
