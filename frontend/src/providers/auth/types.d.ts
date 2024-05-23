import { HttpError } from "@refinedev/core";

export type RefineError = HttpError;

export type CheckResponse = {
  authenticated: boolean;
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type OnErrorResponse = {
  redirectTo?: string;
  logout?: boolean;
  error?: RefineError | Error;
};

export type SuccessNotificationResponse = {
  message: string;
  description?: string;
};

export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: RefineError | Error;
  [key: string]: unknown;
  successNotification?: SuccessNotificationResponse;
};

export type PermissionResponse = unknown;

export type IdentityResponse = unknown;
