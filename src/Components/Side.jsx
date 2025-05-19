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
import { RiGroup3Fill } from "react-icons/ri";
import {TbReportAnalytics} from "react-icons/tb";
import "./Side.css";

const Side = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const userRole = localStorage.getItem("userRole") || "staff";

  const sideBarItems = {
    super_admin: [
      { icon: <MdOutlinePostAdd />, label: "Post" },
      { icon: <RiGroup3Fill />, label: "Users" },
      { icon: <FaPeopleGroup />, label: "Department" },
      { icon: <CgProfile />, label: "Profile" },
      { icon: <TbReportAnalytics />, label: "Analysis" },
      { icon: <HiArrowSmRight />, label: "Sign In" },
      { icon: <HiTable />, label: "Sign Up" },
    ],
    admin: [
      { icon: <MdOutlinePostAdd />, label: "Post" },
      { icon: <FaPeopleGroup />, label: "Department" },
      { icon: <CgProfile />, label: "Profile" },
    ],
    staff: [
      { icon: <CgProfile />, label: "Profile" },
      { icon: <TbReportAnalytics />, label: "Analysis" },
    ],
  };
  

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {/* put a generic user logo */}
      <ul className="menu">
        {sideBarItems[userRole] ?.map((item, index) => (
          <li>
            {item.icon} {isOpen && <span>{item.label}</span>}
          </li>
        ))}
        // <li>
        //   <MdOutlinePostAdd /> {isOpen && <span>Post</span>}
        // </li>
        // <li>
        //   <RiGroup3Fill /> {isOpen && <span>Users</span>}
        // </li>
        // <li>
        //   <FaPeopleGroup /> {isOpen && <span>Department</span>}
        // </li>
        // <li>
        //   {" "}
        //   <CgProfile />
        //   {isOpen && <span>Profile</span>}
        // </li>
        // <li>
        //   <TbReportAnalytics />
        //   {isOpen && <span>Analysis</span>}
        // </li>
        // <li>
        //   <HiArrowSmRight /> {isOpen && <span>Sign In</span>}
        // </li>
        // <li>
        //   <HiTable /> {isOpen && <span>Sign Up</span>}
        // </li>
      </ul>
    </div>
  );
};

export default Side;
