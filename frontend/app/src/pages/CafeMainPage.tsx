import React from "react";
import NavBar from "../components/Navbar";

function CafeMainPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">cafeMain</div>
    </div>
  );
}

export default CafeMainPage;
