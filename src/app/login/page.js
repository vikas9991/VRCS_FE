"use client";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { setAuthTokenCookie } from "../utility/JWTcookie.js";
import { useRouter } from "next/navigation";
import { UserContext } from "../layout.js";
export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/livemenu/auth/login",
        {
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      let token = response.data.jwttoken;
      let role = response.data.role;
      let name = response.data.name;
      let email = response.data.email;
      setAuthTokenCookie(token);
      dispatch({ type: "USER", payload: token });
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.warning("invalid user credentials", { position: "top-center" });
    }
  };
  return (
    <div className="flex justify-center antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-12">
          <h2 className="text-2xl font-bold">Login</h2>
          <div className="mt-8 max-w-md">
            <form
              action="#!"
              className="grid grid-cols-4 gap-6"
              onSubmit={handleLogin}
            >
              <label className="block col-span-4">
                <span className="text-gray-700">Email address</span>
                <input
                  name="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="john@example.com"
                />
              </label>
              <label className="block col-span-4">
                <span className="text-gray-700">Password</span>
                <input
                  name="password"
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <button
                type="submit"
                className="col-span-1 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
