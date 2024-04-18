import React from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";

function MyReceiptPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">MyReceiptPage</div>
      <BottomTabBar />
    </div>
  );
}

export default MyReceiptPage;
