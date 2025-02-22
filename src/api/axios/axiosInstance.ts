import { useAuthApi } from "../../api/auth/auth.api";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  timeoutErrorMessage: "Request Timeout",
});

const getHeaders = (isMultipart = false, isAuth = false) => {
  const { accessToken } = useAuthApi.getState();
  const headers: any = {
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
  };
  if (isAuth) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
};

axiosInstance.interceptors.request.use(
  (config) => {
    // Get the current state for each request to ensure fresh tokens
    const { isAuth } = useAuthApi.getState();
    // Pass isAuth to getHeaders based on the current auth state
    config.headers = getHeaders(
      config.headers?.["Content-Type"] === "multipart/form-data",
      isAuth
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { refreshToken } = useAuthApi.getState();

    if (error.response?.message === "jwt expired") {
      try {
        const response = await axios.post(
          "/auth/refresh-token",
          {
            refreshToken: refreshToken,
          },
          {
            headers: getHeaders(false, true),
            baseURL: import.meta.env.VITE_API_URL as string,
          }
        );
        useAuthApi.setState({ accessToken: response.data.accessToken });
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        useAuthApi.setState({ user: null, isAuth: false });
        return Promise.reject(refreshError);
      }
    }
    // Important: always return a Promise.reject for other errors
    return Promise.reject(error);
  }
);
