import React from "react";
import {Outlet} from "react-router-dom";
import Side from "./Side";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[250px] fixed h-screen">
        <Side />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px]">
        <Topbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
