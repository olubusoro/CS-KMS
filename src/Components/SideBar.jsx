import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Props/Button"
import {
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import { MdOutlinePostAdd, MdCategory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiGroup3Fill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { IoIosGitPullRequest } from "react-icons/io";
import Logo from "../assets/Switch.jpeg";
import FetchData from "../Utils/FetchData";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

const menuConfig = {
  SuperAdmin: [
    {
      icon: <MdOutlinePostAdd />,
      label: "Post",
      path: "/dashboardLayout/new-post",
    },
    {icon: <RiGroup3Fill />, label: "Users", path: "/dashboardLayout/users"},
    {
      icon: <FaPeopleGroup />,
      label: "Departments",
      path: "/dashboardLayout/departments",
    },
    {
      icon: <TbReportAnalytics />,
      label: "Analysis",
      path: "/dashboardLayout/logs",
    },
    {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
    {
      icon: <IoIosGitPullRequest />,
      label: "Access-Requests",
      path: "/dashboardLayout/requests",
    },
  ],
  DeptAdmin: [
    {
      icon: <MdOutlinePostAdd />,
      label: "Post",
      path: "/dashboardLayout/new-post",
    },
    {
      icon: <MdCategory />,
      label: "Category",
      path: "/dashboardLayout/category",
    },
    {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
    {
      icon: <IoIosGitPullRequest />,
      label: "Access-Requests",
      path: "/dashboardLayout/requests",
    },
  ],
  Staff: [
    {
      icon: <MdOutlinePostAdd />,
      label: "Post",
      path: "/dashboardLayout/new-post",
    },
    {icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile"},
    {
      icon: <IoIosGitPullRequest />,
      label: "Access-Requests",
      path: "/dashboardLayout/requests",
    },
  ],
};

const defaultMenu = [
  { icon: <CgProfile />, label: "Profile", path: "/dashboardLayout/profile" },
  { icon: <HiArrowSmRight />, label: "Login", path: "/" },
];

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  const getUserRole = async () => {
    const res = await FetchData(`${baseUrl}/api/users/role`);
    return res.flag ? setUserRole(res.message) : console.error("error occurred: ", res.message);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = getUserRole() || localStorage.getItem("userRole");
    if (token && storedRole) {
      setUserRole(storedRole);
    } else {
      setUserRole(null);
    }
  }, [location.pathname]);

  const menuItems = userRole
    ? menuConfig[userRole] || defaultMenu
    : defaultMenu;

  // Responsive: close sidebar on link click (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && setSidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen  bg-green-800 text-white flex flex-col justify-between
          transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-0"}
          overflow-x-hidden
          md:w-56 md:static md:block
          shadow-lg
        `}
        aria-label="Sidebar"
      >
        {/* Top section: profile and menu */}
        <div>
          {/* Profile placeholder and close button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-green-900">
            <img
              src="https://ui-avatars.com/api/?name=User&background=166534&color=fff"
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <button
              className="md:hidden text-2xl" //if i want to add the cancel button i just remove hidden on medium screen devices 
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>
          {/* Menu */}
          <div className="flex flex-col justify-between" style={{ height: "68vh" }}>
          <nav className="overflow-y-auto mt-2">
            <ul className="space-y-1">
              {menuItems.map((item, idx) => (
                <li className="mt-2  mb-3.5" key={idx}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center gap-4 mt-9 px-4 py-2 rounded-lg
                      hover:bg-green-700 transition
                      text-base font-medium
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Bottom section: logo and footer */}
        <div>
          <div className="flex flex-col items-center py-4">
            <img
              src={Logo}
              alt="Logo"
              className="h-12 w-35 object-cover mb-2"
            />
          </div>
          <div className="px-4 py-4 border-t border-green-900 text-center text-xs opacity-70">
            &copy; {new Date().getFullYear()} CS-KMS
          </div>
        </div>
        </div>
      </aside>
      {/* Hamburger for mobile */}
      {!sidebarOpen && (
        <Button
          className="md:hidden fixed top-4 left-4 z-50 bg-green-500 text-white border-none rounded p-2 shadow"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          label="☰"
        />
      )}
    </>
  );
};

export default SideBar;