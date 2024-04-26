import type * as Types from "./schema.types";

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
