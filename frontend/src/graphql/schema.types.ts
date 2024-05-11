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
  /** Cancels a subscription entity by ID. */
  cancelSubscription: Subscription;
  /** Creates a new payment entity. */
  createPayment: Payment;
  /** Creates the predefined plans in the database. */
  createPlans: Array<Plan>;
  /** Creates a new subscription entity. */
  createSubscription: Subscription;
  /** Deletes all plans from the database. */
  deleteAllPlans: Array<Plan>;
  /** Deletes a plan by its ID. */
  deletePlan: Plan;
  /** Deletes a subscription entity by ID. */
  deleteSubscriptionById: Subscription;
  /** Deletes all subscription entities for a specific user. */
  deleteSubscriptionsByUserId: Array<Subscription>;
  /** Logs in a user with the specified details. */
  login: AuthResponse;
  /** Logs out a user with the specified user ID. */
  logout: LogoutResponse;
  /** Generates new access and refresh tokens for a user. */
  refresh: NewTokensResponse;
  /** Refreshes all subscriptions credits. */
  refreshSubscriptionsCredits: Scalars["String"]["output"];
  /** Registers a new user with the specified details. */
  register: AuthResponse;
  /** Updates a plan by its ID. */
  updatePlan: Plan;
  /** Validates all subscriptions. */
  validateSubscriptions: Scalars["String"]["output"];
};

export type MutationCancelSubscriptionArgs = {
  subscriptionId: Scalars["String"]["input"];
};

export type MutationCreatePaymentArgs = {
  newPaymentInput: NewPaymentInput;
};

export type MutationCreateSubscriptionArgs = {
  newSubscriptionInput: NewSubscriptionInput;
};

export type MutationDeletePlanArgs = {
  planId: Scalars["String"]["input"];
};

export type MutationDeleteSubscriptionByIdArgs = {
  subscriptionId: Scalars["String"]["input"];
};

export type MutationDeleteSubscriptionsByUserIdArgs = {
  userId: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationUpdatePlanArgs = {
  planId: Scalars["String"]["input"];
  updatePlanInput: UpdatePlanInput;
};

export type NewPaymentInput = {
  /** Amount of the payment */
  amount: Scalars["Float"]["input"];
  /** Order ID of the payment */
  orderId: Scalars["String"]["input"];
  /** Source of the payment */
  paymentSource: Scalars["String"]["input"];
  /** PayPal subscription ID of the payment */
  paypalSubId: Scalars["String"]["input"];
  /** ID of the associated plan that the payment is for */
  planId: Scalars["String"]["input"];
  /** ID of the associated user that owns the payment */
  userId: Scalars["String"]["input"];
};

export type NewSubscriptionInput = {
  /** ID of the payment that created the subscription */
  paymentId: Scalars["String"]["input"];
  /** ID of the subscription plan */
  planId: Scalars["String"]["input"];
  /** ID of the associated user that owns the subscription */
  userId: Scalars["String"]["input"];
};

export type NewTokensResponse = {
  /** JSON Web Token (JWT) used for authorization and access */
  accessToken: Scalars["String"]["output"];
  /** Token for refreshing the JSON Web Token (JWT) when it expires */
  refreshToken: Scalars["String"]["output"];
};

export type Payment = {
  /** Amount of the payment */
  amount: Scalars["Float"]["output"];
  /** Date and time of the payment creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Unique identifier of the payment */
  id: Scalars["String"]["output"];
  /** Order ID of the payment */
  orderId: Scalars["String"]["output"];
  /** Source of the payment */
  paymentSource: Scalars["String"]["output"];
  /** PayPal subscription ID of the payment */
  paypalSubId: Scalars["String"]["output"];
  /** Payment associated subscription entity */
  subscription?: Maybe<Scalars["String"]["output"]>;
  /** Subscription ID of the payment */
  subscriptionId: Scalars["String"]["output"];
  /** Date and time of the payment last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Payment associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the payment */
  userId: Scalars["String"]["output"];
};

export type Plan = {
  /** Date and time of the plan creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Number of credits given by the plan */
  credits: Scalars["Float"]["output"];
  /** Description of the plan */
  description: Scalars["String"]["output"];
  /** Duration of the plan */
  duration: Scalars["Float"]["output"];
  /** Unique identifier of the plan */
  id: Scalars["String"]["output"];
  /** Name of the plan */
  name: Scalars["String"]["output"];
  /** Price of the plan */
  price: Scalars["Float"]["output"];
  /** Date and time of the plan last update */
  updatedAt: Scalars["DateTime"]["output"];
};

export type Query = {
  /** Gets all the available plans. */
  getAllPlans: Array<Plan>;
  /** Retrieves all subscription entities. */
  getAllSubscriptions: Array<Subscription>;
  /** Gets a plan by its ID. */
  getPlanById: Plan;
  /** Retrieves a single subscription entity by ID. */
  getSubscriptionById: Subscription;
  /** Retrieves all subscription entities for a specific plan. */
  getSubscriptionsByPlanId: Array<Subscription>;
  /** Retrieves all subscription entities for a specific user. */
  getSubscriptionsByUserId: Array<Subscription>;
  /** A simple hello world query to test the GraphQL API. */
  hello: Scalars["String"]["output"];
  /** Returns the currently authenticated user. */
  me: MeResponse;
};

export type QueryGetPlanByIdArgs = {
  planId: Scalars["String"]["input"];
};

export type QueryGetSubscriptionByIdArgs = {
  subscriptionId: Scalars["String"]["input"];
};

export type QueryGetSubscriptionsByPlanIdArgs = {
  planId: Scalars["String"]["input"];
};

export type QueryGetSubscriptionsByUserIdArgs = {
  userId: Scalars["String"]["input"];
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

export type Subscription = {
  /** Date and time of the subscription creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Number of days with service ongoing */
  daysWithService: Scalars["Float"]["output"];
  /** Unique identifier of the subscription */
  id: Scalars["String"]["output"];
  /** Subscription is active */
  isActive: Scalars["Boolean"]["output"];
  /** Subscription is deactivated */
  isDeactivated: Scalars["Boolean"]["output"];
  /** ID of the owner user that owns the subscription */
  ownerUserId?: Maybe<Scalars["String"]["output"]>;
  /** Subscription associated payment entity */
  payment?: Maybe<Payment>;
  /** ID of the associated payment that owns the subscription */
  paymentId: Scalars["String"]["output"];
  /** Subscription associated plan entity */
  plan?: Maybe<Plan>;
  /** ID of the subscription plan */
  planId: Scalars["String"]["output"];
  /** Date and time of the subscription last refresh */
  refreshedAt: Scalars["DateTime"]["output"];
  /** Date and time of the subscription last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Subscription associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the subscription */
  userId?: Maybe<Scalars["String"]["output"]>;
};

export type UpdatePlanInput = {
  /** Plan description */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Plan duration */
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  /** Plan name */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** Plan price */
  price?: InputMaybe<Scalars["Int"]["input"]>;
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
  /** User associated subscription entity */
  subscription?: Maybe<Subscription>;
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
  /** Number of free credits available in the wallet */
  freeCredits: Scalars["Float"]["output"];
  /** Unique identifier of the wallet */
  id: Scalars["String"]["output"];
  /** Number of subscription credits available in the wallet */
  subscriptionCredits: Scalars["Float"]["output"];
  /** Number of top-up credits available in the wallet */
  topUpCredits: Scalars["Float"]["output"];
  /** Date and time of the wallet last update */
  updatedAt: Scalars["DateTime"]["output"];
  /** Wallet associated user entity */
  user?: Maybe<User>;
  /** ID of the associated user that owns the wallet */
  userId: Scalars["String"]["output"];
};
