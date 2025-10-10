import axios from "axios";
import { getAccessToken, setAccessToken } from "@/utils/localStorage";
import { refreshToken } from "@/api/auth";

const axiosInstance = axios.create({
  baseURL: "https://e-learning.devssh.xyz",
});

// 🔹 Request Interceptor — Add token
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response Interceptor — Handle 401 / 403 Globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Get the HTTP status code
    const status = error?.response?.status;

    // ✅ Handle 401 Unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          setAccessToken(newAccessToken);

          // Retry the failed request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Remove invalid token and redirect
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    // ✅ Handle 403 Forbidden — directly redirect
    if (status === 403) {
      console.warn("Access denied — redirecting to login");
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
