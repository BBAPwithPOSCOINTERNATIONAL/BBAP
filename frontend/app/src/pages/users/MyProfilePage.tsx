import React from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";

function MyProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">MyProfilePage</div>
      <BottomTabBar />
    </div>
  );
}

export default MyProfilePage;
