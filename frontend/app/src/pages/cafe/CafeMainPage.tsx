import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";
import CafeCoupon from "../../components/cafe/CafeCoupon";
import menu from "../../assets/cafe-menu.json";
import MenuSection from "../../components/cafe/MenuSection";
import together from "../../assets/together.png";

import MenuButtons from "../../components/cafe/MenuButtons";
import CafeSelector from "../../components/cafe/CafeSelector";
import useMoveScroll from "../../hooks/useMoveScroll";

function CafeMainPage() {
  const [content, setContent] = useState("alone");
  const [selectedMenu, setSelectedMenu] = useState("coffee");
  const [selectedCafe, setSelectedCafe] = useState("A카페");
  const cafes = [
    { value: "A카페", label: "A카페" },
    { value: "B카페", label: "B카페" },
    { value: "C카페", label: "C카페" },
  ];

  const handleCafeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCafe(e.target.value);
  };

  const tabs = [
    { key: "alone", label: "혼자주문" },
    { key: "together", label: "같이주문" },
    { key: "history", label: "나의주문" },
  ];

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
  const [couponCount, setCouponCount] = useState(7);

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
              <CafeSelector
                cafes={cafes}
                selectedCafe={selectedCafe}
                onCafeSelect={handleCafeSelect}
              />
              <CafeCoupon orderCount={orderCount} couponCount={couponCount} />
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
        {content === "together" && (
          <>
            <CafeSelector
              cafes={cafes}
              selectedCafe={selectedCafe}
              onCafeSelect={handleCafeSelect}
            />
            <div className="mt-2 flex flex-col items-center">
              <div className="bg-light-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center">
                <h2 className="m-8 text-4xl">우리같이 주문 할래 ?</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <img src={together} alt="together" style={{ width: "80%" }} />
                </div>

                <hr className="h-1 bg-white m-2 mx-auto w-11/12" />
                <p className="m-4 text-2xl">
                  각자 원하는 메뉴를 담아두면 한꺼번에 주문할 수 있어요!!
                </p>
              </div>

              <button
                className="bg-primary-color text-white py-2 px-4 rounded hover:bg-primary-dark mt-4 font-hyemin-bold w-11/12"
                onClick={() => console.log("gogo")}
              >
                방 만들러 가기
              </button>
            </div>
          </>
        )}
        {content === "history" && <div>주문 내역을 보는 페이지입니다.</div>}
      </div>
    </div>
  );
}

export default CafeMainPage;
