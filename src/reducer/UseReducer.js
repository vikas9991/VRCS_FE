"use client";
import {getAuthTokenFromCookie} from "../app/utility/JWTcookie.js";
export const initialState = getAuthTokenFromCookie();

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
