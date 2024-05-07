import React, { useEffect, useState } from "react";
import { getCafeList, Cafe, CafeMenuItem } from "../../api/cafeAPI";
import CafeCoupon from "./CafeCoupon";
import MenuButtons from "./MenuButtons";
import MenuSection from "./MenuSection";
import Button from "../../components/button";
import useMoveScroll from "../../hooks/useMoveScroll";
import useCartStore from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

const CafeSelector: React.FC = () => {
  const navigate = useNavigate();
  const [cafeList, setCafeList] = useState<Cafe[]>([]);
  const [selectedCafeId, setSelectedCafeId] = useState<string>("");
  const [couponCnt, setCouponCnt] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("coffee");
  const [menuListCoffee, setMenuListCoffee] = useState<CafeMenuItem[]>([]);
  const [menuListBeverage, setMenuListBeverage] = useState<CafeMenuItem[]>([]);
  const [menuListDessert, setMenuListDessert] = useState<CafeMenuItem[]>([]);

  const { totalPrice, totalCount } = useCartStore((state) => ({
    totalPrice: state.totalPrice,
    totalCount: state.totalCount,
  }));

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === "coffee") scrollToCoffee();
    else if (menu === "beverage") scrollToBeverage();
    else if (menu === "dessert") scrollToDessert();
  };

  // 처음 마운트 될 때 한 번만 카페 목록을 불러옵니다.
  useEffect(() => {
    async function loadCafes() {
      const storedCafeId = localStorage.getItem("cafeId") || "-1";
      try {
        const response = await getCafeList(storedCafeId);
        setCafeList(response.data.cafeList);

        // 유효한 카페가 있으면 설정, 없으면 첫 번째 카페 설정
        const validCafe = response.data.cafeList.find(
          (cafe) => cafe.id === storedCafeId
        );
        setSelectedCafeId(
          validCafe ? validCafe.id : response.data.cafeList[0]?.id || ""
        );
        setCouponCnt(response.data.selectedCafe.stampCnt);
      } catch (error) {
        console.error("Error fetching cafe list:", error);
      }
    }
    loadCafes();
  }, []);

  useEffect(() => {
    // 선택된 카페 ID가 바뀌면 새로운 데이터를 로드
    async function fetchCafeData() {
      if (selectedCafeId && selectedCafeId !== "-1") {
        try {
          const response = await getCafeList(selectedCafeId);
          setCouponCnt(response.data.selectedCafe.stampCnt);
          setMenuListCoffee(response.data.selectedCafe.menuListCoffee);
          setMenuListBeverage(response.data.selectedCafe.menuListBeverage);
          setMenuListDessert(response.data.selectedCafe.menuListDesert);
        } catch (error) {
          console.error("Error fetching cafe data:", error);
        }
      }
    }
    fetchCafeData();
  }, [selectedCafeId]);

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

  const handleCafeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCafeId(e.target.value);
    localStorage.setItem("cafeId", e.target.value);
  };

  return (
    <>
      <div className="sticky top-[105px] bg-white flex flex-col w-full items-center z-20">
        <select
          id="cafe-select"
          value={selectedCafeId}
          onChange={handleCafeSelect}
          className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center flex justify-center items-center h-9"
        >
          {cafeList.map((cafe) => (
            <option key={cafe.id} value={cafe.id}>
              {cafe.name}
            </option>
          ))}
        </select>
      </div>
      <div className=" sticky top-[140px] z-20 bg-white">
        <CafeCoupon orderCount={10} couponCount={couponCnt} />
        <div className="flex mt-1">
          <MenuButtons
            selectedMenu={selectedMenu}
            onSelectMenu={handleMenuSelect}
          />
        </div>
      </div>

      <MenuSection ref={coffeeRef} items={menuListCoffee} title="커피" />
      <MenuSection ref={beverageRef} items={menuListBeverage} title="음료" />
      <MenuSection ref={dessertRef} items={menuListDessert} title="디저트" />
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
  );
};

export default CafeSelector;
