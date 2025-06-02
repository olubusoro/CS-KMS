import React, { useState } from "react";
import SideBar from "./SideBar";
import TopBar from "./NewTopBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col sm:flex-row">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 min-h-screen flex flex-col transition-all duration-300">
        <TopBar />
        <div className="p-2 h-full sm:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
