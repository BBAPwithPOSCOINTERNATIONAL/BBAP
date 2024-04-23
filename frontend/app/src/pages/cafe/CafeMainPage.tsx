import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";
import CafeCoupon from "../../components/cafe/CafeCoupon";
import menu from "../../assets/cafe-menu.json";
import MenuSection from "../../components/cafe/MenuSection";

// interface MenuItem {
//   name: string;
//   price: number;
//   description: string;
//   images: string;
//   temperature?: string[];
//   size?: string[];
//   options?: { [key: string]: number };
// }

import { useRef } from "react";
import MenuButtons from "../../components/cafe/MenuButtons";

function useMoveScroll(offset = 0) {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
    if (element.current) {
      const elementPosition =
        element.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  return { element, onMoveToElement };
}

function CafeMainPage() {
  const [content, setContent] = useState("alone");
  const [selectedCafe, setSelectedCafe] = useState("A카페");
  const [selectedMenu, setSelectedMenu] = useState("coffee");

  const tabs = [
    { key: "alone", label: "혼자주문" },
    { key: "together", label: "같이주문" },
    { key: "history", label: "나의주문" },
  ];

  // const coffeeRef = useRef<HTMLDivElement>(null);
  // const beverageRef = useRef<HTMLDivElement>(null);
  // const dessertRef = useRef<HTMLDivElement>(null);

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === "coffee") scrollToCoffee();
    else if (menu === "beverage") scrollToBeverage();
    else if (menu === "dessert") scrollToDessert();
  };

  useEffect(() => {
    const handleScroll = () => {
      const middleScreen = window.innerHeight / 2;

      const coffeePosition = coffeeRef.current?.getBoundingClientRect();
      const beveragePosition = beverageRef.current?.getBoundingClientRect();
      const dessertPosition = dessertRef.current?.getBoundingClientRect();

      if (
        dessertPosition &&
        dessertPosition.top <= middleScreen &&
        dessertPosition.bottom >= middleScreen
      ) {
        setSelectedMenu("dessert");
      } else if (
        beveragePosition &&
        beveragePosition.top <= middleScreen &&
        beveragePosition.bottom >= middleScreen
      ) {
        setSelectedMenu("beverage");
      } else if (
        coffeePosition &&
        coffeePosition.top <= middleScreen &&
        coffeePosition.bottom >= middleScreen
      ) {
        setSelectedMenu("coffee");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [orderCount, setOrderCount] = useState(10);
  const [couponCount, setCouponCount] = useState(9);

  // 게이지 바 색상 설정을 위한 함수
  const getGaugeColor = (index: number): string => {
    if (index <= couponCount) {
      return "bg-primary-color"; // 주문량까지의 부분은 녹색으로 표시
    } else {
      return "bg-sky-200"; // 주문량 이후의 부분은 회색으로 표시
    }
  };

  // 게이지 바 생성을 위한 배열
  const gaugeBars = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className={`h-4 w-full ${getGaugeColor(index + 1)} rounded-sm`}
    ></div>
  ));

  const navBarHeight = 50; // NavBar의 높이 추정값
  const tabsHeight = 50; // CafeTabs의 높이 추정값
  const couponAndButtonsHeight = 10; // CafeCoupon과 버튼 그룹의 높이 추정값

  const totalOffset = navBarHeight + tabsHeight + couponAndButtonsHeight;

  const { element: coffeeRef, onMoveToElement: scrollToCoffee } = useMoveScroll(
    totalOffset + 270
  );
  const { element: beverageRef, onMoveToElement: scrollToBeverage } =
    useMoveScroll(totalOffset + 270);
  const { element: dessertRef, onMoveToElement: scrollToDessert } =
    useMoveScroll(totalOffset + 270);

  return (
    <div>
      <div
        className="sticky top-0 z-30 bg-white"
        style={{ height: `${navBarHeight}px` }}
      >
        <NavBar />
      </div>

      <div
        className="sticky top-[65px] z-20 bg-white"
        style={{ height: `${tabsHeight}px` }}
      >
        <CafeTabs content={content} setContent={setContent} tabs={tabs} />
      </div>
      <div>
        {content === "alone" && (
          <>
            <div
              className="sticky top-[110px] z-10 bg-white"
              style={{ paddingTop: `${couponAndButtonsHeight}px` }}
            >
              <div className="mt-2 flex flex-col items-center">
                <select
                  id="cafe-select"
                  value={selectedCafe}
                  onChange={(e) => setSelectedCafe(e.target.value)}
                  className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center"
                >
                  <option value="A카페">A카페</option>
                  <option value="B카페">B카페</option>
                  <option value="C카페">C카페</option>
                </select>
              </div>
              <CafeCoupon
                orderCount={orderCount}
                couponCount={couponCount}
                gaugeBars={gaugeBars}
              />
              <div className="flex mt-1">
                <MenuButtons
                  selectedMenu={selectedMenu}
                  onSelectMenu={handleMenuSelect}
                />
              </div>
            </div>
            <MenuSection ref={coffeeRef} items={menu.coffee} title="커피" />
            <MenuSection ref={beverageRef} items={menu.beverage} title="음료" />
            <MenuSection ref={dessertRef} items={menu.dessert} title="디저트" />
          </>
        )}
        {content === "together" && <div>같이 주문하는 페이지입니다.</div>}
        {content === "history" && <div>주문 내역을 보는 페이지입니다.</div>}
      </div>
    </div>
  );
}

export default CafeMainPage;
