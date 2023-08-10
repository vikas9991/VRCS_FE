"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "../app/layout.js";
import { removeAuthTokenCookie } from "@/app/utility/JWTcookie.js";
import dynamic from "next/dynamic";


function CustomNavbar() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);

  const RenderOptions = () => {
    if (state) {
      return (
        <ul className="h-screen md:h-auto items-center justify-center md:flex ">
          <li className="pb-6 text-xl  py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#about" onClick={() => setNavbar(!navbar)}>
              About
            </Link>
          </li>

          <li className="pb-6 text-xl  py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#blog" onClick={() => setNavbar(!navbar)}>
              Close Shop
            </Link>
          </li>

          <li className="pb-6 text-xl  py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#blog" onClick={() => setNavbar(!navbar)}>
              Settings
            </Link>
          </li>

          <li className="pb-6 text-xl  py-2 px-6 text-center  border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link
              href="/"
              onClick={() => {
                setNavbar(!navbar);
                removeAuthTokenCookie();
                dispatch({ type: "USER", payload: null });
                router.reload();
              }}
            >
              log out
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="h-screen md:h-auto items-center justify-center md:flex ">
          <li className="pb-6 text-xl  py-2 md:px-6 text-center border-b-2 md:border-b-0  hover:bg-purple-600  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent">
            <Link href="#about" onClick={() => setNavbar(!navbar)}>
              About
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="mb-28">
      <nav className="w-full bg-white fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link href="/">
                <h2 className="text-2xl text-red-600 font-bold ">VRCS</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <RenderOptions />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default dynamic (() => Promise.resolve(CustomNavbar), {ssr: false})