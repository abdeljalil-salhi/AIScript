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

export type LoginMutationVariables = Types.Exact<{
  loginInput: Types.LoginInput;
}>;

export type LoginMutation = {
  login: Pick<Types.AuthResponse, "accessToken" | "refreshToken"> & {
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
