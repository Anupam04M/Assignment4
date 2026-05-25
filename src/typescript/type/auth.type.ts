export type AuthActionType =
  | { type: "START_REGISTER" }
  | { type: "SUCCESS_REGISTER" }
  | { type: "FAILED_REGISTER"; payload: string | null }
  | { type: "START_LOGIN" }
  | { type: "SUCCESS_LOGIN"; payload: any }
  | { type: "FAILED_LOGIN"; payload: string | null }
  | { type: "SUCCESS_LOGOUT" };
