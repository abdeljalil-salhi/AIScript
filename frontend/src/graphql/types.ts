import type * as Types from "./schema.types";

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
    | "subscriptionId"
    | "createdAt"
    | "updatedAt"
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
