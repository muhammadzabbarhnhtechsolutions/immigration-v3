// // src/utils/localStorage.js

// // Key names for tokens in localStorage
// const ACCESS_TOKEN_KEY = 'access_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

// /**
//  * Save the access token to localStorage.
//  * @param token The access token to save.
//  */
// export const setAccessToken = (token) => {
//   localStorage.setItem(ACCESS_TOKEN_KEY, token);
// };

// /**
//  * Get the access token from localStorage.
//  * @returns The access token, or null if not found.
//  */
// export const getAccessToken = () => {
//   return localStorage.getItem(ACCESS_TOKEN_KEY);
// };

// /**
//  * Remove the access token from localStorage.
//  */
// export const removeAccessToken = () => {
//   localStorage.removeItem(ACCESS_TOKEN_KEY);
// };

// /**
//  * Save the refresh token to localStorage.
//  * @param token The refresh token to save.
//  */
// export const setRefreshToken = (token) => {
//   localStorage.setItem(REFRESH_TOKEN_KEY, token);
// };

// /**
//  * Get the refresh token from localStorage.
//  * @returns The refresh token, or null if not found.
//  */
// export const getRefreshToken = () => {
//   return localStorage.getItem(REFRESH_TOKEN_KEY);
// };

// /**
//  * Remove the refresh token from localStorage.
//  */
// export const removeRefreshToken = () => {
//   localStorage.removeItem(REFRESH_TOKEN_KEY);
// };

// /**
//  * Clear all stored tokens (both access and refresh tokens).
//  */
// export const clearTokens = () => {
//   removeAccessToken();
//   removeRefreshToken();
// };



// src/utils/tokenStorage.js
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

/**
 * Save the access token to localStorage and cookies.
 */
export const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    path: "/",
    // expires: 7, // Optional: 7 din ka expiry
    // secure: true, // for HTTPS only
    // sameSite: "Strict"
  });
};

/**
 * Get access token from localStorage or fallback to cookies.
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || Cookies.get(ACCESS_TOKEN_KEY);
};

/**
 * Remove access token from both localStorage and cookies.
 */
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  Cookies.remove(ACCESS_TOKEN_KEY);
};

/**
 * Save the refresh token to localStorage.
 */
export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Get refresh token from localStorage.
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Remove the refresh token.
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Clear both tokens.
 */
export const clearTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};
