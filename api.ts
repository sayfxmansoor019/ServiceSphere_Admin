import axios from "axios";
import config from './config';

import { sessionData } from "./src/constants";

const api = axios.create({
  baseURL: config.API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("spe_admin_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentPath = window.location.pathname;


    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.status === 440) // login timeout error
    ) {
      console.error("Unauthorized, invalid or expired token");
      sessionData.removeUserToken();
      sessionData.removeUserId();
      window.location.href = "/sign-in";
    } else if ( (error.code === "ERR_NETWORK" && currentPath !== "/network-error") || error.code === "ERR_BAD_RESPONSE" ) {
      window.location.href = "/network-error";
    }
    

    return Promise.reject(error);
  }
);

export default api;
