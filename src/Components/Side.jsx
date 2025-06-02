import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {HiArrowSmRight, HiTable} from "react-icons/hi";
import {MdOutlinePostAdd} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import {MdCategory} from "react-icons/md";
import {RiGroup3Fill} from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import {IoIosGitPullRequest} from "react-icons/io";
import "./Side.css";
import Logo from "../assets/Switch.jpeg"

const Side = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userRole, setUserRole] = useState(null); // null by default
  const location = useLocation();

  // Update role on every route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");

    if (token && storedRole) {
      setUserRole(storedRole);
    } else {
      setUserRole(null); // fallback if not logged in
    }
  }, [location.pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sideBarItems = {
    SuperAdmin: [
      {
        icon: <MdOutlinePostAdd />,
        label: "Post",
        path: "/dashboardLayout/new-post",
      },
      {icon: <RiGroup3Fill />, label: "Users", path: "/dashboardLayout/users"},
      {
        icon: <FaPeopleGroup />,
        label: "Department",
        path: "/dashboardLayout/departments",
      },
      {icon: <TbReportAnalytics />, label: "Analysis", path: "/analysis"},
      {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
      {icon: <HiTable />, label: "Sign Up", path: "/signout"},
    ],
    DeptAdmin: [
      {
        icon: <MdOutlinePostAdd />,
        label: "Post",
        path: "/dashboardLayout/new-post",
      },
      {icon: <MdCategory />, label: "Category", path: "/dashboardLayout/category"},
      {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
    ],
    Staff: [
      {
        icon: <MdOutlinePostAdd />,
        label: "Post",
        path: "/dashboardLayout/new-post",
      },
      {icon: <CgProfile />, label: "Profile", path: "/profile"},
      {icon: <IoIosGitPullRequest />, label: "Access Request", path: "/"},
    ],
  };

  const defaultItems = [
    {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
    {icon: <HiArrowSmRight />, label: "Login", path: "/login"},
  ];

  // Decide what menu to show
  const menuItems = userRole
    ? sideBarItems[userRole] || defaultItems
    : defaultItems;

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <Link to={item.path}>
              <li key={index}>
           
              {item.icon} {isOpen && <span>{item.label}</span>}
          
          </li>
          </Link>
        
        ))}
      </ul>
      {/* <footer className={`sidebar-footer ${userRole?.toLowerCase() || 'guest'}`}> */}
      <footer>
        <img src={Logo} className="pt-27 "/>
      </footer>
    </div>
  );
};

export default Side;
