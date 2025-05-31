import React, { useState } from "react";
import {IoIosNotificationsOutline} from "react-icons/io";
import {CiSettings} from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import Button from "../Props/Button"
import Modal from "../Props/Modal";
import Notifications from "./Notifications";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-4 pr-4">
        <div className="search-bar">
          <form className="w-2xs mx-auto">
            <label
              for="default-search"
              className="mb-2 text-sm font-medium  sr-only dark:text-white"
            >
              Search
            </label>
            <div className="flex items-center  rounded-lg px-3 py-2 w-87 max-w-md">
              <input
                type="text"
                className="flex-1 px-2 bg-transparent text-sm focus:outline-none"
                placeholder="Search"
              />

              <Button
                type="submit"
                label="Search"
                className="ml-2 mt-7 px-4 py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
             / >
                     
            </div>
          </form>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        ></button>
        <div className="icons flex gap-4 text-xl">
          <a href="" onClick={()=> setIsOpen(!isOpen)}> <IoIosNotificationsOutline /></a>
          <Modal>
            <Notifications />
          </Modal>
          <a href=""><CiSettings /></a>
          <a href=""><CiUser /></a>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;