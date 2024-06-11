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
  /** Whether 2FA is enabled */
  is2faEnabled: Scalars["Boolean"]["output"];
  /** Refresh token of the user */
  refreshToken: Scalars["String"]["output"];
  /** Short lived token of the user */
  shortLivedToken?: Maybe<Scalars["String"]["output"]>;
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

export type Book = {
  /** Author of the book */
  author: Scalars["String"]["output"];
  /** Cover image URL of the book */
  cover: Scalars["String"]["output"];
  /** Book creation date */
  createdAt: Scalars["DateTime"]["output"];
  /** Book document URL */
  document: Scalars["String"]["output"];
  /** Unique identifier of the book */
  id: Scalars["String"]["output"];
  /** Whether the book is showcased or not */
  isShowcase: Scalars["Boolean"]["output"];
  /** Number of chapters in the book */
  numChapters: Scalars["Float"]["output"];
  /** Number of subsections in the book */
  numSubsections: Scalars["Float"]["output"];
  /** Owner user associated with the book */
  owner?: Maybe<User>;
  /** ID of the book owner */
  ownerId: Scalars["String"]["output"];
  /** Book PDF document URL */
  pdf: Scalars["String"]["output"];
  /** Target audience of the book */
  targetAudience?: Maybe<Scalars["String"]["output"]>;
  /** Title of the book */
  title: Scalars["String"]["output"];
  /** Topic of the book */
  topic: Scalars["String"]["output"];
  /** Book last update date */
  updatedAt: Scalars["DateTime"]["output"];
};

export type ChangePasswordInput = {
  /** Confirm password for the user */
  confirmPassword: Scalars["String"]["input"];
  /** New password for the user */
  newPassword: Scalars["String"]["input"];
  /** Old password of the user */
  oldPassword: Scalars["String"]["input"];
  /** ID of the user requesting the password change */
  userId: Scalars["String"]["input"];
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

export type EmailVerification = {
  /** Email verification associated connection entity */
  connection?: Maybe<Connection>;
  /** ID of the associated connection */
  connectionId: Scalars["String"]["output"];
  /** Verification token creation date */
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  /** Email address to verify */
  email: Scalars["String"]["output"];
  /** Verification token expiration date */
  expiresAt: Scalars["DateTime"]["output"];
  /** Unique identifier of the email verification */
  id: Scalars["String"]["output"];
  /** Verification token last sent at */
  lastSentAt: Scalars["DateTime"]["output"];
  /** Verification token */
  token: Scalars["String"]["output"];
  /** Verification token update date */
  updatedAt: Scalars["DateTime"]["output"];
};

export type ForgotPassword = {
  /** Forgot password associated connection entity */
  connection?: Maybe<Connection>;
  /** ID of the associated connection */
  connectionId: Scalars["String"]["output"];
  /** Creation date of the password reset token */
  createdAt: Scalars["DateTime"]["output"];
  /** Email address of the account requesting the password reset */
  email: Scalars["String"]["output"];
  /** Expiration date of the password reset token */
  expiresAt: Scalars["DateTime"]["output"];
  /** Unique identifier of the forgot password */
  id: Scalars["String"]["output"];
  /** Date the reset token was last sent */
  lastSentAt: Scalars["DateTime"]["output"];
  /** Reset token */
  token: Scalars["String"]["output"];
  /** Update date of the password reset token */
  updatedAt: Scalars["DateTime"]["output"];
};

export type LoginInput = {
  /** Password of the user */
  password: Scalars["String"]["input"];
  /** Username or email of the user */
  usernameOrEmail: Scalars["String"]["input"];
};

export type LoginTwoFactorAuthenticationInput = {
  /** The two-factor authentication one-time password (OTP) entered by the user */
  otp: Scalars["String"]["input"];
  /** The ID of the user to log in with two-factor authentication */
  userId: Scalars["String"]["input"];
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
  /** Changes the password of the current user. */
  changePassword: Scalars["String"]["output"];
  /** Creates a new book entity. */
  createBook: Book;
  /** Creates the predefined plans in the database. */
  createPlans: Array<Plan>;
  /** Creates a new subscription entity. */
  createSubscription: Subscription;
  /** Deletes all plans from the database. */
  deleteAllPlans: Array<Plan>;
  /** Deletes a book entity by ID. */
  deleteBookById?: Maybe<Book>;
  /** Deletes a plan by its ID. */
  deletePlan: Plan;
  /** Deletes a subscription entity by ID. */
  deleteSubscriptionById: Subscription;
  /** Deletes all subscription entities for a specific user. */
  deleteSubscriptionsByUserId: Array<Subscription>;
  /** Disables two-factor authentication for the current user. */
  disableTwoFactorAuthentication: TwoFactorAuthentication;
  /** Enables two-factor authentication for the current user. */
  enableTwoFactorAuthentication: TwoFactorAuthentication;
  /** Verifies the forgot password token and updates the user password. */
  forgotPassword: AuthResponse;
  /** Generates a two-factor authentication secret and OTP authentication URI for a user. */
  generateTwoFactorAuthenticationSecret: TwoFactorAuthentication;
  /** Logs in a user with the specified details. */
  login: AuthResponse;
  /** Logs in a user with two-factor authentication. */
  loginTwoFactorAuthentication: AuthResponse;
  /** Logs out a user with the specified user ID. */
  logout: LogoutResponse;
  /** Generates new access and refresh tokens for a user. */
  refresh: NewTokensResponse;
  /** Refreshes all subscriptions credits. */
  refreshSubscriptionsCredits: Scalars["String"]["output"];
  /** Registers a new user with the specified details. */
  register: AuthResponse;
  /** Requests an email verification for the specified email. */
  requestEmailVerification: EmailVerification;
  /** Requests a forgot password token for the specified email. */
  requestForgotPassword: ForgotPassword;
  /** Creates a new payment entity while subscribing to a plan. */
  subscribe: Payment;
  /** Updates a plan by its ID. */
  updatePlan: Plan;
  /** Update a user by their ID */
  updateUser: User;
  /** Validates all subscriptions. */
  validateSubscriptions: Scalars["String"]["output"];
  /** Verifies the email verification with the specified token. */
  verifyEmail: Scalars["String"]["output"];
  /** Verifies the password of the current user. */
  verifyPassword: Scalars["Boolean"]["output"];
  /** Verifies a two-factor authentication one-time password. */
  verifyTwoFactorAuthentication: TwoFactorAuthentication;
};

export type MutationCancelSubscriptionArgs = {
  subscriptionId: Scalars["String"]["input"];
};

export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationCreateBookArgs = {
  newBookInput: NewBookInput;
};

export type MutationCreateSubscriptionArgs = {
  newSubscriptionInput: NewSubscriptionInput;
};

export type MutationDeleteBookByIdArgs = {
  bookId: Scalars["String"]["input"];
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

export type MutationDisableTwoFactorAuthenticationArgs = {
  otp: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationEnableTwoFactorAuthenticationArgs = {
  otp: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
  verifyForgotPasswordInput: VerifyForgotPasswordInput;
};

export type MutationGenerateTwoFactorAuthenticationSecretArgs = {
  userId: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationLoginTwoFactorAuthenticationArgs = {
  loginTwoFactorAuthenticationInput: LoginTwoFactorAuthenticationInput;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationRequestEmailVerificationArgs = {
  requestEmailVerificationInput: RequestEmailVerificationInput;
};

export type MutationRequestForgotPasswordArgs = {
  requestForgotPasswordInput: RequestForgotPasswordInput;
};

export type MutationSubscribeArgs = {
  subscribeInput: SubscribeInput;
};

export type MutationUpdatePlanArgs = {
  planId: Scalars["String"]["input"];
  updatePlanInput: UpdatePlanInput;
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationVerifyEmailArgs = {
  token: Scalars["String"]["input"];
};

export type MutationVerifyPasswordArgs = {
  password: Scalars["String"]["input"];
};

export type MutationVerifyTwoFactorAuthenticationArgs = {
  otp: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type NewBookInput = {
  /** Author of the book */
  author: Scalars["String"]["input"];
  /** Cover image URL of the book */
  cover: Scalars["String"]["input"];
  /** Document URL of the book */
  document: Scalars["String"]["input"];
  /** Whether the book is a showcase item */
  isShowcase?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Number of chapters in the book */
  numChapters: Scalars["Float"]["input"];
  /** Number of subsections in the book */
  numSubsections: Scalars["Float"]["input"];
  /** ID of the book owner */
  ownerId: Scalars["String"]["input"];
  /** PDF URL of the book */
  pdf: Scalars["String"]["input"];
  /** Target audience of the book */
  targetAudience?: InputMaybe<Scalars["String"]["input"]>;
  /** Title of the book */
  title: Scalars["String"]["input"];
  /** Topic of the book */
  topic: Scalars["String"]["input"];
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
  /** JSON Web Token (JWT) access token used for authorization and access */
  accessToken: Scalars["String"]["output"];
  /** Token for refreshing the JSON Web Token (JWT) access token when it expires */
  refreshToken: Scalars["String"]["output"];
};

export type Payment = {
  /** Amount of the payment */
  amount: Scalars["Float"]["output"];
  /** Date and time of the payment creation */
  createdAt: Scalars["DateTime"]["output"];
  /** Facilitator access token of the payment */
  facilitatorAccessToken: Scalars["String"]["output"];
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
  /** Retrieves all book entities. */
  getAllBooks: Array<Book>;
  /** Gets all the available plans. */
  getAllPlans: Array<Plan>;
  /** Retrieves all subscription entities. */
  getAllSubscriptions: Array<Subscription>;
  /** Retrieves a book entity by ID. */
  getBookById?: Maybe<Book>;
  /** Retrieves all book entities of a user. */
  getBooksByUserId: Array<Book>;
  /** Gets a plan by its ID. */
  getPlanById: Plan;
  /** Retrieves all showcase books. */
  getShowcaseBooks: Array<Book>;
  /** Retrieves a single subscription entity by ID. */
  getSubscriptionById: Subscription;
  /** Retrieves all subscription entities for a specific plan. */
  getSubscriptionsByPlanId: Array<Subscription>;
  /** Retrieves all subscription entities for a specific user. */
  getSubscriptionsByUserId: Array<Subscription>;
  /** Returns the currently authenticated user. */
  me: MeResponse;
};

export type QueryGetBookByIdArgs = {
  bookId: Scalars["String"]["input"];
};

export type QueryGetBooksByUserIdArgs = {
  userId: Scalars["String"]["input"];
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

export type RequestEmailVerificationInput = {
  /** ID of the connection requesting the email verification */
  connectionId: Scalars["String"]["input"];
  /** Email of the user requesting the email verification */
  email: Scalars["String"]["input"];
  /** ID of the user requesting the email verification */
  userId: Scalars["String"]["input"];
};

export type RequestForgotPasswordInput = {
  /** Email of the user requesting the password reset */
  email: Scalars["String"]["input"];
};

export type SubscribeInput = {
  /** Amount of the payment */
  amount: Scalars["Float"]["input"];
  /** Access token of the payment facilitator */
  facilitatorAccessToken: Scalars["String"]["input"];
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

export type TwoFactorAuthentication = {
  /** The associated connection entity */
  connection?: Maybe<Connection>;
  /** The two-factor authentication (2FA) validation status */
  is2faValid?: Maybe<Scalars["Boolean"]["output"]>;
  /** The one-time password authentication URI */
  otpAuthUri?: Maybe<Scalars["String"]["output"]>;
  /** The two-factor authentication (2FA) status */
  status?: Maybe<Scalars["String"]["output"]>;
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

export type UpdateUserInput = {
  /** The new email of the user */
  email?: InputMaybe<Scalars["String"]["input"]>;
  /** The ID of the user to update */
  userId: Scalars["String"]["input"];
  /** The new username of the user */
  username?: InputMaybe<Scalars["String"]["input"]>;
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

export type VerifyForgotPasswordInput = {
  /** New password confirmation for the user */
  confirmPassword: Scalars["String"]["input"];
  /** Email of the user changing the password */
  email: Scalars["String"]["input"];
  /** New password for the user */
  password: Scalars["String"]["input"];
  /** Token for the forgot password reset */
  token: Scalars["String"]["input"];
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
