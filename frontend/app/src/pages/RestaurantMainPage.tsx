import React from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";

function RestaurantMainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">RestaurantMainPage</div>
      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
