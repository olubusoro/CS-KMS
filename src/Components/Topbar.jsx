import React from "react";
import {IoIosNotificationsOutline} from "react-icons/io";
import {CiSettings} from "react-icons/ci";
import {CiUser} from "react-icons/ci";

const Topbar = () => {
  return (
    <nav class="bg-white">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="search-bar">
          <form class="w-2xs mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium  sr-only dark:text-white"
            >
              Search
            </label>
            <div className="flex items-center  rounded-lg px-3 py-2 w-87 max-w-md">
              {/* <svg
                className="w-4 h-5 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg> */}

              <input
                type="text"
                className="flex-1 px-2 bg-transparent text-sm focus:outline-none"
                placeholder="Search"
              />

              <button
                type="submit"
                className="ml-2 mt-1 px-4 py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        ></button>
        <div className="icons flex gap-4 text-xl">
          <a href=""> <IoIosNotificationsOutline /></a>
          <a href=""><CiSettings /></a>
          <a href=""><CiUser /></a>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;