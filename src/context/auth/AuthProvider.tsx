import React, { useReducer, type ReactNode } from "react";
import AuthContext from "./CreateAuthContext";
import { authinitialstate, authreducer } from "../../reducer/auth.reducer";
import { getErrorMessage } from "../../services/helper/global.helper";
import {
  loginUserFns,
  registerUserFns,
} from "../../api/function/auth.function";
import type {
  LoginPayload,
  RegisterPayload,
} from "../../typescript/interface/auth.interface";
import Cookies from "js-cookie";
import { toast } from "sonner";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, dispatchauthdata] = useReducer(
    authreducer,
    authinitialstate,
  );

  const registeruser = async (data: RegisterPayload) => {
    dispatchauthdata({ type: "START_REGISTER" });
    try {
      const response = await registerUserFns(data);
      dispatchauthdata({ type: "SUCCESS_REGISTER" });
      return response;
    } catch (error) {
      const err = getErrorMessage(error);
      dispatchauthdata({ type: "FAILED_REGISTER", payload: err });
      return err;
    }
  };

  const loginuser = async (data: LoginPayload) => {
    dispatchauthdata({ type: "START_LOGIN" });
    try {
      const response = await loginUserFns(data);
      console.log("Response", response);
      dispatchauthdata({ type: "SUCCESS_LOGIN", payload: response });
      Cookies.set("token", response.accessToken);
      Cookies.set("role", response.user.role);
      Cookies.set("refreshToken", response.refreshToken);
      Cookies.set("userDetails", JSON.stringify(response.user));

      return response;
    } catch (error) {
      const err = getErrorMessage(error);
      dispatchauthdata({ type: "FAILED_LOGIN", payload: err });
      return err;
    }
  };

  const logout = () => {
    dispatchauthdata({ type: "SUCCESS_LOGOUT" });
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userDetails");
    toast.success("Logout Sucessfully");
  };

  return (
    <AuthContext
      value={{
        authData,
        registeruser,
        loginuser,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
