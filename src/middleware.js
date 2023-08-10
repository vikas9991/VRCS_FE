import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {getAuthTokenFromCookie} from "./app/utility/JWTcookie.js";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get('User-JWT-token');
  const loggedInUserNotAccess =
  request.nextUrl.pathname === '/login' ||
  request.nextUrl.pathname === '/register';
    if(loggedInUserNotAccess)
    {
      if(authToken)
      {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register"],
};
