import React, {useState} from "react";
import SideBar from "./SideBar";
import TopBar from "./NewTopBar";
import {Outlet} from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - fixed and sticky */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Sticky TopBar */}
        <TopBar onSearch={(value) => setSearchTerm(value)} />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-4">
          <Outlet context={{searchTerm}} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
