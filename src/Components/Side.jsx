import React, {useState} from "react";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import { MdOutlinePostAdd } from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import {RiGroup3Fill} from "react-icons/ri";
import "./Side.css";

const Side = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* put a generic user logo */}
      <ul className="menu">
        <li>
          <MdOutlinePostAdd /> {isOpen && <span>Post</span>}
        </li>
        <li>
          <RiGroup3Fill /> {isOpen && <span>Users</span>}
        </li>
        <li>
          <FaPeopleGroup /> {isOpen && <span>Department</span>}
        </li>
        <li>
          {" "}
          <CgProfile />
          {isOpen && <span>Profile</span>}
        </li>
        <li>
          <HiShoppingBag /> {isOpen && <span>Products</span>}
        </li>
        <li>
          <HiArrowSmRight /> {isOpen && <span>Sign In</span>}
        </li>
        <li>
          <HiTable /> {isOpen && <span>Sign Up</span>}
        </li>
      </ul>
    </div>
  );
};

export default Side;
