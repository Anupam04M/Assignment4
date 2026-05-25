import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { forceLogout } from "../services/helper/global.helper";
import { endpoint } from "./endpoint";

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});
API.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("error in axios interceptor", error.response);
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      // toast.error(error.response.data.message);
      console.log("Error coming in Interceptor", error.response);
      // forceLogout();
      const refreshtoken = Cookies.get("refreshToken");
      console.log("Refresh Token", refreshtoken);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/auth/refresh`,
          {
            refreshToken: refreshtoken,
          },
        );
        console.log("RefToken", response);
        const newAccessToken = response?.data?.newAccessToken;
        console.log("New :", newAccessToken);
        Cookies.set("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (error) {
        console.log("Error in Response", error);
        forceLogout();
      }
    }
    return Promise.reject(error);
  },
);
export default API;
