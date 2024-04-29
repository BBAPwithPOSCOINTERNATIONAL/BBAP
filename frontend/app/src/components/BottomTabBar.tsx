import { Outlet, Link, useLocation } from "react-router-dom";
import Coffee from "../assets/bottom/Coffe.png";
import myprofile from "../assets/bottom/myprofile.png";
import myprofileClick from "../assets/bottom/myprofileClick.png";
import receipts from "../assets/bottom/receipts.png";
import receiptsClick from "../assets/bottom/receiptsClick.png";
import res from "../assets/bottom/res.png";
import resClick from "../assets/bottom/resClick.png";

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
      <footer className="bg-white text-center p-4 fixed inset-x-0 bottom-0 border-t border-gray-300">
        {" "}
        {/* 하단바 */}
        <nav>
          <ul className="flex justify-around list-none m-0 p-0">
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link to="/cafemain">
                <img src={Coffee} alt="cafe" style={{ width: "3rem" }} />
                카페가기
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link to="/restaurantmain">
                <img
                  src={getImage("/restaurantmain", res, resClick)}
                  alt="restaurant"
                  style={{ width: "3rem" }}
                />
                식당가기
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link to="/receipt">
                <img
                  src={getImage("/receipt", receipts, receiptsClick)}
                  alt="receipts"
                  style={{ width: "3rem" }}
                />
                내영수증
              </Link>
            </li>
            <li className="active:scale-95 active:bg-gray-400 p-2 rounded-lg transition duration-150 ease-in-out font-hyemin-bold">
              <Link to="/profile">
                <img
                  src={getImage("/profile", myprofile, myprofileClick)}
                  alt="myprofile"
                  style={{ width: "3rem" }}
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
