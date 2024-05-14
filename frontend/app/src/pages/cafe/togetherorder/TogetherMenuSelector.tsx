import React, { useEffect, useState } from "react";
import { CafeMenuItem } from "../../../api/cafeAPI";

import MenuButtons from "../../../components/cafe/MenuButtons.tsx";
import useMoveScroll from "../../../hooks/useMoveScroll.tsx";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../components/Navbar.tsx";
import { CafeNameInfo } from "../../../components/cafe/CafeNameInfo.tsx";
import { useRoomStore } from "../../../store/roomStore.tsx";
import TogetherMenuSection from "../../../components/cafe/TogetherMenuSection.tsx";

const TogetherMenuSelector: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("coffee");
  const [menuListCoffee, setMenuListCoffee] = useState<CafeMenuItem[]>([]);
  const [menuListBeverage, setMenuListBeverage] = useState<CafeMenuItem[]>([]);
  const [menuListDessert, setMenuListDessert] = useState<CafeMenuItem[]>([]);

  const { currentCafe, currentCafeMenuList } = useRoomStore();

  const { roomId } = useParams();

  useEffect(() => {
    if (currentCafeMenuList) {
      setMenuListCoffee(currentCafeMenuList.menuListCoffee);
      setMenuListBeverage(currentCafeMenuList.menuListBeverage);
      setMenuListDessert(currentCafeMenuList.menuListDesert);
    }
  }, [currentCafeMenuList]);

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

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="sticky top-0 z-30 bg-white" style={{ height: "50px" }}>
        <NavBar goBack={goBack} />
      </div>
      <div className="sticky top-[65px] bg-white flex flex-col w-full items-center z-20">
        {currentCafe && <CafeNameInfo cafe={currentCafe} />}
      </div>
      <div className=" sticky top-[100px] z-20 bg-white">
        <div className="flex mt-1">
          <MenuButtons
            selectedMenu={selectedMenu}
            onSelectMenu={handleMenuSelect}
          />
        </div>
      </div>
      <TogetherMenuSection
        ref={coffeeRef}
        items={menuListCoffee}
        roomId={roomId}
        title={"커피"}
      />
      <TogetherMenuSection
        ref={beverageRef}
        items={menuListBeverage}
        roomId={roomId}
        title={"음료"}
      />
      <TogetherMenuSection
        ref={dessertRef}
        items={menuListDessert}
        roomId={roomId}
        title={"디저트"}
      />
    </>
  );
};

export default TogetherMenuSelector;
