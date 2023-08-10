"use client";

import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter();
  const handleRegistration = async (event) => {
    event.preventDefault();
    try
    {

      const response = await axios.post(
        "http://localhost:8080/livemenu/api/registerUser",
        {
          firstName: event.target.firstName.value,
          lastName: event.target.lastName.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );
      router.push('/login');
    }
    catch(error)
    {
      router.push('/login');
    }

    // Redirects to the login page
  };
  return (
    <div className="flex justify-center antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-12">
          <h2 className="text-2xl font-bold">Register</h2>
          <div className="mt-8 max-w-md">
            <form action='#!'
              className="grid grid-cols-2 gap-6"
              onSubmit={handleRegistration}
            >
              <label>
                <span className="text-gray-700">First name</span>
                <input
                  name="firstName"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder=""
                />
              </label>
              <label>
                <span className="text-gray-700">Last name</span>
                <input
                  name="lastName"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder=""
                />
              </label>
              <label className="block col-span-2">
                <span className="text-gray-700">Email address</span>
                <input
                  name="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="john@example.com"
                />
              </label>
              <label className="block col-span-2">
                <span className="text-gray-700">Password</span>
                <input
                  name="password"
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </label>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
