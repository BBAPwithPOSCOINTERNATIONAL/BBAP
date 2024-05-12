import { Outlet, Link, useLocation } from "react-router-dom";
import Coffee from "/assets/images/bottom/Coffe.png";
import myprofile from "/assets/images/bottom/myprofile.png";
import myprofileClick from "/assets/images/bottom/myprofileClick.png";
import receipts from "/assets/images/bottom/receipts.png";
import receiptsClick from "/assets/images/bottom/receiptsClick.png";
import res from "/assets/images/bottom/res.png";
import resClick from "/assets/images/bottom/resClick.png";

function BottomTabBar() {
  const location = useLocation();

  const getImage = (
    path: string,
    defaultImg: string,
    activeImg: string
  ): string => {
    return location.pathname === path ? activeImg : defaultImg;
  };

  return (
    <div>
      <div>
        <Outlet /> {/* 메인 콘텐츠 */}
      </div>
      <footer
        className="bg-slate-50 text-center p-1 fixed inset-x-0 bottom-0 border-t border-gray-300"
        style={{
          boxShadow: "-3px -2px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {" "}
        {/* 하단바 */}
        <nav>
          <ul className="flex justify-around list-none m-0 p-0">
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link
                to="/cafemain"
                className="flex flex-col items-center justify-center text-sm"
              >
                <img src={Coffee} alt="cafe" className="w-8" />{" "}
                <span>카페가기</span>
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link
                to="/restaurantmain"
                className="flex flex-col items-center justify-center text-sm"
              >
                <img
                  src={getImage("/restaurantmain", res, resClick)}
                  alt="restaurant"
                  className="w-8"
                />
                식당가기
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link
                to="/receipt"
                className="flex flex-col items-center justify-center text-sm"
              >
                <img
                  src={getImage("/receipt", receipts, receiptsClick)}
                  alt="receipts"
                  className="w-8"
                />
                사용내역
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link
                to="/profile"
                className="flex flex-col items-center justify-center text-sm"
              >
                <img
                  src={getImage("/profile", myprofile, myprofileClick)}
                  alt="myprofile"
                  className="w-8"
                />
                내프로필
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default BottomTabBar;
