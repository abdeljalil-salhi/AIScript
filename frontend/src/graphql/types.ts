import type * as Types from "./schema.types";

export type CancelSubscriptionMutationVariables = Types.Exact<{
  subscriptionId: Types.Scalars["String"]["input"];
}>;

export type CancelSubscriptionMutation = {
  cancelSubscription: Pick<
    Types.Subscription,
    "id" | "daysWithService" | "isActive" | "createdAt" | "updatedAt"
  > & { plan?: Types.Maybe<Pick<Types.Plan, "id" | "name" | "duration">> };
};

export type ChangePasswordMutationVariables = Types.Exact<{
  changePasswordInput: Types.ChangePasswordInput;
}>;

export type ChangePasswordMutation = Pick<Types.Mutation, "changePassword">;

export type DeleteBookByIdMutationVariables = Types.Exact<{
  bookId: Types.Scalars["String"]["input"];
}>;

export type DeleteBookByIdMutation = {
  deleteBookById?: Types.Maybe<
    Pick<
      Types.Book,
      | "id"
      | "ownerId"
      | "author"
      | "title"
      | "topic"
      | "targetAudience"
      | "numChapters"
      | "numSubsections"
      | "cover"
      | "document"
      | "pdf"
      | "createdAt"
      | "updatedAt"
    >
  >;
};

export type DisableTwoFactorAuthenticationMutationVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
  otp: Types.Scalars["String"]["input"];
}>;

export type DisableTwoFactorAuthenticationMutation = {
  disableTwoFactorAuthentication: Pick<
    Types.TwoFactorAuthentication,
    "status"
  > & {
    connection?: Types.Maybe<
      Pick<
        Types.Connection,
        | "id"
        | "email"
        | "isEmailVerified"
        | "is2faEnabled"
        | "provider"
        | "otpCreatedAt"
      >
    >;
  };
};

export type EnableTwoFactorAuthenticationMutationVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
  otp: Types.Scalars["String"]["input"];
}>;

export type EnableTwoFactorAuthenticationMutation = {
  enableTwoFactorAuthentication: Pick<
    Types.TwoFactorAuthentication,
    "status"
  > & {
    connection?: Types.Maybe<
      Pick<
        Types.Connection,
        | "id"
        | "email"
        | "isEmailVerified"
        | "is2faEnabled"
        | "provider"
        | "otpCreatedAt"
      >
    >;
  };
};

export type ForgotPasswordMutationVariables = Types.Exact<{
  verifyForgotPasswordInput: Types.VerifyForgotPasswordInput;
}>;

export type ForgotPasswordMutation = {
  forgotPassword: { user: Pick<Types.User, "id"> };
};

export type GenerateTwoFactorAuthenticationSecretMutationVariables =
  Types.Exact<{
    userId: Types.Scalars["String"]["input"];
    username: Types.Scalars["String"]["input"];
  }>;

export type GenerateTwoFactorAuthenticationSecretMutation = {
  generateTwoFactorAuthenticationSecret: Pick<
    Types.TwoFactorAuthentication,
    "status" | "otpAuthUri"
  >;
};

export type LoginMutationVariables = Types.Exact<{
  loginInput: Types.LoginInput;
}>;

export type LoginMutation = {
  login: Pick<
    Types.AuthResponse,
    "shortLivedToken" | "accessToken" | "refreshToken" | "is2faEnabled"
  > & {
    user: Pick<
      Types.User,
      "id" | "username" | "isAdmin" | "createdAt" | "updatedAt"
    > & {
      connection?: Types.Maybe<
        Pick<
          Types.Connection,
          | "email"
          | "isEmailVerified"
          | "is2faEnabled"
          | "provider"
          | "otpCreatedAt"
        >
      >;
      avatar?: Types.Maybe<
        Pick<Types.Avatar, "defaultFilename" | "filename" | "updatedAt">
      >;
      wallet?: Types.Maybe<Pick<Types.Wallet, "balance" | "updatedAt">>;
    };
  };
};

export type LoginTwoFactorAuthenticationMutationVariables = Types.Exact<{
  loginTwoFactorAuthenticationInput: Types.LoginTwoFactorAuthenticationInput;
}>;

export type LoginTwoFactorAuthenticationMutation = {
  loginTwoFactorAuthentication: Pick<
    Types.AuthResponse,
    "shortLivedToken" | "accessToken" | "refreshToken" | "is2faEnabled"
  > & { user: Pick<Types.User, "id" | "username"> };
};

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  logout: Pick<Types.LogoutResponse, "isLoggedOut">;
};

export type RegisterMutationVariables = Types.Exact<{
  registerInput: Types.RegisterInput;
}>;

export type RegisterMutation = {
  register: Pick<Types.AuthResponse, "accessToken" | "refreshToken"> & {
    user: Pick<
      Types.User,
      "id" | "username" | "isAdmin" | "createdAt" | "updatedAt"
    > & {
      connection?: Types.Maybe<
        Pick<
          Types.Connection,
          | "email"
          | "isEmailVerified"
          | "is2faEnabled"
          | "provider"
          | "otpCreatedAt"
        >
      >;
      avatar?: Types.Maybe<
        Pick<Types.Avatar, "defaultFilename" | "filename" | "updatedAt">
      >;
      wallet?: Types.Maybe<Pick<Types.Wallet, "balance" | "updatedAt">>;
    };
  };
};

export type RequestEmailVerificationMutationVariables = Types.Exact<{
  requestEmailVerificationInput: Types.RequestEmailVerificationInput;
}>;

export type RequestEmailVerificationMutation = {
  requestEmailVerification: Pick<
    Types.EmailVerification,
    "id" | "email" | "expiresAt" | "createdAt" | "updatedAt"
  >;
};

export type RequestForgotPasswordMutationVariables = Types.Exact<{
  requestForgotPasswordInput: Types.RequestForgotPasswordInput;
}>;

export type RequestForgotPasswordMutation = {
  requestForgotPassword: Pick<
    Types.ForgotPassword,
    "id" | "email" | "expiresAt" | "createdAt" | "updatedAt"
  >;
};

export type SubscribeMutationVariables = Types.Exact<{
  subscribeInput: Types.SubscribeInput;
}>;

export type SubscribeMutation = {
  subscribe: Pick<
    Types.Payment,
    | "id"
    | "userId"
    | "amount"
    | "orderId"
    | "paypalSubId"
    | "paymentSource"
    | "facilitatorAccessToken"
    | "subscriptionId"
    | "createdAt"
    | "updatedAt"
  >;
};

export type UpdateUserMutationVariables = Types.Exact<{
  updateUserInput: Types.UpdateUserInput;
}>;

export type UpdateUserMutation = {
  updateUser: Pick<
    Types.User,
    "id" | "username" | "createdAt" | "updatedAt"
  > & { connection?: Types.Maybe<Pick<Types.Connection, "email">> };
};

export type VerifyEmailMutationVariables = Types.Exact<{
  token: Types.Scalars["String"]["input"];
}>;

export type VerifyEmailMutation = Pick<Types.Mutation, "verifyEmail">;

export type VerifyPasswordMutationVariables = Types.Exact<{
  password: Types.Scalars["String"]["input"];
}>;

export type VerifyPasswordMutation = Pick<Types.Mutation, "verifyPassword">;

export type GetBookByIdQueryVariables = Types.Exact<{
  bookId: Types.Scalars["String"]["input"];
}>;

export type GetBookByIdQuery = {
  getBookById?: Types.Maybe<
    Pick<
      Types.Book,
      | "id"
      | "author"
      | "title"
      | "topic"
      | "targetAudience"
      | "numChapters"
      | "numSubsections"
      | "cover"
      | "document"
      | "pdf"
      | "createdAt"
      | "updatedAt"
    > & {
      owner?: Types.Maybe<Pick<Types.User, "id" | "username" | "createdAt">>;
    }
  >;
};

export type GetBooksByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetBooksByUserIdQuery = {
  getBooksByUserId: Array<
    Pick<
      Types.Book,
      | "id"
      | "ownerId"
      | "author"
      | "title"
      | "topic"
      | "targetAudience"
      | "numChapters"
      | "numSubsections"
      | "cover"
      | "document"
      | "pdf"
      | "createdAt"
      | "updatedAt"
    >
  >;
};

export type GetShowcaseBooksQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetShowcaseBooksQuery = {
  getShowcaseBooks: Array<
    Pick<
      Types.Book,
      | "id"
      | "ownerId"
      | "author"
      | "title"
      | "topic"
      | "cover"
      | "targetAudience"
      | "numChapters"
      | "numSubsections"
      | "document"
      | "pdf"
      | "isShowcase"
      | "createdAt"
      | "updatedAt"
    > & { owner?: Types.Maybe<Pick<Types.User, "username">> }
  >;
};

export type GetSubscriptionsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetSubscriptionsByUserIdQuery = {
  getSubscriptionsByUserId: Array<
    Pick<
      Types.Subscription,
      | "id"
      | "isActive"
      | "isDeactivated"
      | "daysWithService"
      | "createdAt"
      | "updatedAt"
    > & { plan?: Types.Maybe<Pick<Types.Plan, "id" | "name" | "createdAt">> }
  >;
};

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    user: Pick<
      Types.User,
      "id" | "username" | "isAdmin" | "createdAt" | "updatedAt"
    > & {
      connection?: Types.Maybe<
        Pick<
          Types.Connection,
          | "id"
          | "email"
          | "isEmailVerified"
          | "is2faEnabled"
          | "provider"
          | "otpCreatedAt"
        >
      >;
      avatar?: Types.Maybe<
        Pick<Types.Avatar, "defaultFilename" | "filename" | "updatedAt">
      >;
      wallet?: Types.Maybe<Pick<Types.Wallet, "id" | "balance" | "updatedAt">>;
      subscription?: Types.Maybe<
        Pick<
          Types.Subscription,
          "id" | "daysWithService" | "isActive" | "createdAt"
        > & {
          plan?: Types.Maybe<
            Pick<Types.Plan, "id" | "name" | "price" | "duration" | "createdAt">
          >;
        }
      >;
    };
  };
};
