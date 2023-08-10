import Cookies from 'js-cookie';

const COOKIE_NAME = 'UserName';

export const setUserNameCookie = (token) => {
  // Set the token in the cookie with an expiration date
  Cookies.set(COOKIE_NAME, token); // Expires in 1 days
};

export const getUserNameFromCookie = () => {
  // Get the token from the cookie
  return Cookies.get(COOKIE_NAME);
};

export const removeUseraNameCookie = () => {
  // Remove the token from the cookie
  Cookies.remove(COOKIE_NAME);
};
