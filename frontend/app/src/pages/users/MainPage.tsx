import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import { useState, useEffect } from "react";
import { useUserStore } from "../../store/userStore";

function MainPage() {
  const [error, setError] = useState<string | null>(null);
  const userInfo = useUserStore((state) => state);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-bg-color overflow-hidden">
      <NavBar />
      <div className="p-4">
        <div className="text-center mt-8">
          {userInfo && userInfo.empName ? (
            <h1 className="text-4xl font-hyemin-bold text-white">
              {userInfo.empName} 님의 O월
            </h1>
          ) : (
            <h1 className="text-4xl font-hyemin-bold text-white">
              Loading or error...
            </h1>
          )}
          <p className="text-4xl mt-4 font-hyemin-bold text-white">BBAP 로그</p>
          {/* 추가 정보를 여기에 표시할 수 있습니다. 예를 들어: */}
          <div className="mt-8">
            {userInfo && (
              <>
                <div className="text-xl font-hyemin-bold text-white">
                  부서: {userInfo.department?.departmentName}
                </div>
                <div className="text-xl font-hyemin-bold text-white">
                  포지션: {userInfo.position?.positionName}
                </div>
                <div className="text-xl font-hyemin-bold text-white">
                  사무실: {userInfo.workplace?.workplaceName}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MainPage;
