import React from "react";
import Intro from "../Props/Intro";
import {Card} from "flowbite-react";
import Side from "./Side";
import Topbar from "./Topbar"; 

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Side />

      {/* Main Content */}
      <div className="flex-1">
        {/* Topbar sits at the top of the main content */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="p-6">
          <header>
            <Intro Title="DASHBOARD" Subtitle="Welcome to your dashboard" />
          </header>

          <main >
           <div className="card">
               
                </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
