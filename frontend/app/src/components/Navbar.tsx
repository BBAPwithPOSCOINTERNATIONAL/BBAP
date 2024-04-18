import React from "react";
import { FiBell, FiHome, FiArrowLeft } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();

  // MainPage에서만 타이틀과 알람 표시
  const isMainPage = location.pathname === "/main";

  return (
    <div className="bg-white text-black p-4 flex justify-between items-center">
      <div className="text-left flex items-center space-x-4">
        {/* MainPage가 아닐 때 뒤로가기와 홈 버튼 표시 */}
        {!isMainPage && (
          <>
            <Link to="/main">
              <FiArrowLeft className="text-2xl cursor-pointer" />
            </Link>
            <Link to="/main">
              <FiHome className="text-2xl cursor-pointer" />
            </Link>
          </>
        )}
      </div>
      <div className="text-3xl font-hyemin-bold">BBAP</div>

      <div className="text-right">
        <FiBell className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;
