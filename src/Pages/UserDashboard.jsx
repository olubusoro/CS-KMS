import React from "react";
import Intro from "../Props/Intro";
import Side from "../Components/Side";
import Topbar from "../Components/Topbar";
import Card from "../Props/Dashboardcard";

const UserDashboard = () => {
  // const usersPost = [
  //   {Title:"Rebranding", description:"We are planning on changing the color theme of the company with a new Logo"},
  //   {Title:"Rebranding", description:"We are planning on changing the color theme of the company with a new Logo"},
  //   {Title:"Rebranding", description:"We are planning on changing the color theme of the company with a new Logo"},
  //   {Title:"Rebranding", description:"We are planning on changing the color theme of the company with a new Logo"},
  // ]
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-[250px] fixed h-screen">
        <Side />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[200px]">
        {/* Topbar sits at the top of the main content */}
        <Topbar />

        {/* Dashboard Content */}
        <div className="">
          <header>
            <Intro
              Title="DASHBOARD"
              Subtitle="Welcome to your dashboard"
              className="ml-20"
            />
          </header>

          <main>
            <div className=" grid content-center grid-cols-3 pt-15">
              <Card
                title="System Update"
                description="Scheduled maintenance at 9PM."
              />
              <Card title="New User" description="A new user has registered." />
              <Card
                title="Alert"
                description="Unusual login attempt detected."
              />
              <Card
                title="Alert"
                description="Unusual login attempt detected."
              />
              <Card
                title="Alert"
                description="Unusual login attempt detected."
              />
              <Card
                title="Alert"
                description="Unusual login attempt detected."
              />
              <Card
                title="Alert"
                description="Unusual login attempt detected."
              />
              <Card
                title="Staff's Database"
                description="A complete log of staff's information"
              />
              <Card
                title="Rebranding"
                description="Changing of coompany'slogo and colour theme"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
