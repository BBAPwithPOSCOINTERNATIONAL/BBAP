// MainPage.tsx
import React from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";

function MainPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-color">
      <NavBar />
      <div className="flex-grow p-4">
        <div className="text-center mt-8">
          <h1 className="text-4xl font-hyemin-bold text-white">OO 님의 O월</h1>
          <p className="text-4xl mt-4 font-hyemin-bold text-white">BBAP 로그</p>
          <div className="mt-8">
            <div className="text-xl font-hyemin-bold text-white">
              총 결제 금액
            </div>
            <p className="text-2xl font-hyemin-bold text-primary-color text-white">
              1,000,000 원
            </p>
            <div className="text-xl font-hyemin-bold mt-4 text-white">
              총 지원금
            </div>
            <p className="text-2xl font-hyemin-bold text-white">300,000 원</p>
            <div className="text-xl font-hyemin-bold mt-4 text-white">
              본인부담금
            </div>
            <p className="text-2xl font-hyemin-bold text-white">700,000 원</p>
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MainPage;
