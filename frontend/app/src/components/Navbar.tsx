import React, { useEffect, useState } from "react";
import { FiBell, FiHome, FiArrowLeft } from "react-icons/fi";
import { useLocation, Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();

  // MainPage에서만 타이틀과 알람 표시
  const isMainPage = location.pathname === "/main";

  // NavBar의 높이 상태를 저장하기 위한 state
  const [navBarHeight, setNavBarHeight] = useState(0);
  const navBarRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // NavBar의 실제 높이를 측정하여 상태를 업데이트
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.clientHeight);
    }
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        ref={navBarRef}
        className="fixed top-0 left-0 right-0 z-50 bg-primary-color text-black p-4 flex justify-between items-center"
      >
        <div className="text-left flex items-center space-x-4">
          {/* MainPage가 아닐 때 뒤로가기와 홈 버튼 표시 */}
          {!isMainPage && (
            <>
              <button onClick={goBack}>
                <FiArrowLeft className="text-2xl cursor-pointer text-white" />
              </button>
              <Link to="/main">
                <FiHome className="text-2xl cursor-pointer text-white" />
              </Link>
            </>
          )}
        </div>
        <div className="text-3xl font-hyemin-bold text-white">BBAP</div>

        <div className="text-right">
          <FiBell className="text-2xl cursor-pointer text-white" />
        </div>
      </div>
      {/* 빈 div를 사용하여 NavBar 아래에 공간을 생성 */}
      <div style={{ height: `${navBarHeight}px` }}></div>
    </>
  );
};

export default NavBar;
