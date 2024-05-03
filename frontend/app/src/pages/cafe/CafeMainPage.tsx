import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";
import CafeCoupon from "../../components/cafe/CafeCoupon";
import menu from "../../assets/cafe-menu.json";
import MenuSection from "../../components/cafe/MenuSection";
import together from "/assets/images/together.png";
import Button from "../../components/button";

import MenuButtons from "../../components/cafe/MenuButtons";
import CafeSelector from "../../components/cafe/CafeSelector";
import useMoveScroll from "../../hooks/useMoveScroll";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import useContentStore from "../../store/contentStore";
import MyOrderPage from "./myorder/MyOrderPage";

function CafeMainPage() {
  const navigate = useNavigate();
  const { content, setContent } = useContentStore();
  // const [content, setContent] = useState("alone");
  const [selectedMenu, setSelectedMenu] = useState("coffee");
  const { totalPrice, totalCount } = useCartStore((state) => ({
    totalPrice: state.totalPrice,
    totalCount: state.totalCount,
  }));

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

  const [orderCount] = useState(10);
  const [couponCount] = useState(7);

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
        style={{
          height: `${tabsHeight}px`,
          width: "100vw",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <CafeTabs content={content} setContent={setContent} tabs={tabs} />
      </div>
      <div>
        {content === "alone" && (
          <>
            <div
              className="sticky top-[100px] z-10 bg-white"
              style={{ paddingTop: `${couponAndButtonsHeight}px` }}
            >
              <CafeSelector />
              <CafeCoupon orderCount={orderCount} couponCount={couponCount} />
              <div className="flex mt-1">
                <MenuButtons
                  selectedMenu={selectedMenu}
                  onSelectMenu={handleMenuSelect}
                />
              </div>
            </div>
            <MenuSection
              ref={coffeeRef}
              items={menu.menuListCoffee}
              title="커피"
            />
            <MenuSection
              ref={beverageRef}
              items={menu.menuListBeverage}
              title="음료"
            />
            <MenuSection
              ref={dessertRef}
              items={menu.menuListDessert}
              title="디저트"
            />
            {totalCount > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-stone-100">
                {/* 총 주문 금액 표시 */}
                <h2 className="text-center text-xs font-bold py-2">
                  총 주문 금액: {totalPrice.toLocaleString()}원
                </h2>
                {/* 장바구니 페이지로 이동하는 버튼 */}
                <Button
                  onClick={() => navigate("/cart")}
                  text={
                    <>
                      장바구니 보기
                      <span className="bg-white text-red-500 font-bold rounded-full ml-2 px-2.5 py-1 text-xs">
                        {totalCount}
                      </span>
                    </>
                  }
                  className="bg-primary-color w-full py-2 text-white font-bold mb-2"
                />
              </div>
            )}
          </>
        )}
        {content === "together" && (
          <>
            <CafeSelector />
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
                onClick={() => navigate("/together")}
              >
                방 만들러 가기
              </button>
            </div>
          </>
        )}
        {content === "history" && (
          <>
            <MyOrderPage />
          </>
        )}
      </div>
    </div>
  );
}

export default CafeMainPage;
