// /src/api/auth.ts

import axios from './axiosInstance';
import { getRefreshToken, setAccessToken } from '@/utils/localStorage'; // Custom localStorage utilities

export const refreshToken = async (): Promise<string> => {
    const refresh_token = getRefreshToken(); // Retrieve refresh token from localStorage
    if (!refresh_token) throw new Error('No refresh token available');

    try {
        const response = await axios.post('/auth/refresh', { refreshToken: refresh_token });

        const { accessToken } = response.data;
        setAccessToken(accessToken); // Store the new access token
        return accessToken;
    } catch (error) {
        throw new Error('Unable to refresh token');
    }
};
