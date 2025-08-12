import { _config } from "@/lib/_config";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: _config.backend_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = (await cookies()).get("_linklite_access")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = (await cookies()).get("_linklite_refresh")?.value;

      if (refreshToken) {
        try {
          const res = await axiosInstance.post(
            "/api/v1/users/refresh-access-token",
            {
              _linklite_refresh: refreshToken,
            }
          );

          const {
            access_token: accessToken,
            refresh_token,
            access_expiry,
            refresh_expiry,
          } = res.data;

          (await cookies()).set("_linklite_access", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(access_expiry),
          });
          (await cookies()).set("_linklite_refresh", refresh_token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(refresh_expiry),
          });

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
