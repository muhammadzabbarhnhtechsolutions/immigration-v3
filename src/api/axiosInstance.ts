import axios from 'axios';
import { getAccessToken, setAccessToken } from '@/utils/localStorage'; // Adjust the path as needed
import { refreshToken } from '@/api/auth'; // Your token refresh API logic
// import { BASE_URL } from '@/utils/constants';

const axiosInstance = axios.create({
  baseURL: "https://e-learning.devssh.xyz",
});

// Request interceptor to add the access token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and not retrying already
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const newAccessToken = await refreshToken();
        setAccessToken(newAccessToken); // Update token in localStorage

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // If token refresh fails, log the user out or redirect
        console.error('Token refresh failed:', err);
        // Optionally redirect to login or handle logout
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
