"use client";
import Cookies from 'js-cookie';

const COOKIE_NAME = 'User-JWT-token';

export const setAuthTokenCookie = (token) => {
  // Set the token in the cookie with an expiration date
  Cookies.set(COOKIE_NAME, token, { expires: 1 }); // Expires in 1 days
};

export const getAuthTokenFromCookie = () => {
  // Get the token from the cookie
  return Cookies.get(COOKIE_NAME);
};

export const removeAuthTokenCookie = () => {
  // Remove the token from the cookie
  Cookies.remove(COOKIE_NAME);
};
