"use client"; // This is a client component
import React from "react";
import { client } from "@/lib/contentful/client";
import Link from "next/link";
import { useEffect } from "react";
import UtilityMenu from "../TopHeader";

function Header() {
  const getMainMenu = async () => {
    try {
      const response = await client.getEntries({ content_type: "mainMenu" });
      const responseData = response.items[0].fields.menu;
      console.log("utilityMenu", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainMenu();
  }, [getMainMenu]);

  return (
    <header className="bg-primary">
      <UtilityMenu></UtilityMenu>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://c.dev.academyplus-service.de/sites/germany/files/2022-11/Academy%2B%20Logo_0_0.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Product
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <Link
            href="/posts"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Posts
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

// export const getStaticProps = async () => {
//   const response = await client.getEntries({ content_type: "utilityMenu" });
//   console.log("utilityMenu", response);
//   return {
//     props: {
//       menu: response,
//     },
//   };
// };

export default Header;
