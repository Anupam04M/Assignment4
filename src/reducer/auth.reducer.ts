import type { AuthState } from "../typescript/interface/auth.interface";
import type { AuthActionType } from "../typescript/type/auth.type";
import Cookies from "js-cookie";
const token = Cookies.get("token") ?? null;
const role = Cookies.get("role") ?? null;
const user = Cookies.get("userDetails")
  ? JSON.parse(Cookies.get("userDetails") as string)
  : null;

export const authinitialstate: AuthState = {
  isLoading: false,
  isError: null,
  token: token,
  user: user,
  role: role,
};

export const authreducer = (
  state: AuthState,
  action: AuthActionType,
): AuthState => {
  switch (action.type) {
    case "START_REGISTER":
    case "START_LOGIN":
      return { ...state, isLoading: true, isError: null };
    case "SUCCESS_REGISTER":
      return { ...state, isLoading: false, isError: null };
    case "SUCCESS_LOGIN":
      return {
        ...state,
        isLoading: false,
        isError: null,
        token: action.payload.accessToken,
        user: action.payload.user,
        role: action.payload.user.role,
      };
    case "FAILED_REGISTER":
    case "FAILED_LOGIN":
      return { ...state, isLoading: false, isError: action.payload };
    case "SUCCESS_LOGOUT":
      return { ...state, token: null, user: null, role: null };
    default:
      return state;
  }
};
