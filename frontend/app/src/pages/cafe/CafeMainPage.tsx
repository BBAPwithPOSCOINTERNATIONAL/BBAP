// import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";
// import menu from "../../assets/cafe-menu.json";
// import MenuSection from "../../components/cafe/MenuSection";
import together from "/assets/images/together.png";
// import Button from "../../components/button";

// import MenuButtons from "../../components/cafe/MenuButtons";
import CafeSelector from "../../components/cafe/CafeSelector";
// import useMoveScroll from "../../hooks/useMoveScroll";
import { useNavigate } from "react-router-dom";
// import useCartStore from "../../store/cartStore";
import useContentStore from "../../store/contentStore";
import MyOrderPage from "./myorder/MyOrderPage";

function CafeMainPage() {
  const navigate = useNavigate();
  const { content, setContent } = useContentStore();
  // const [content, setContent] = useState("alone");

  const tabs = [
    { key: "alone", label: "혼자주문" },
    { key: "together", label: "같이주문" },
    { key: "history", label: "나의주문" },
  ];

  const navBarHeight = 50; // NavBar의 높이 추정값
  const tabsHeight = 50; // CafeTabs의 높이 추정값
  const couponAndButtonsHeight = 10; // CafeCoupon과 버튼 그룹의 높이 추정값

  return (
    <div>
      <div
        className="sticky top-0 z-30 bg-white"
        style={{ height: `${navBarHeight}px` }}
      >
        <NavBar />
      </div>

      <div
        className="sticky top-[55px] z-20 bg-white"
        style={{
          height: `${tabsHeight}px`,
          width: "100vw",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <CafeTabs content={content} setContent={setContent} tabs={tabs} />
      </div>
      <div className="mt-10vh">
        {content === "alone" && (
          <>
            <div
              className="sticky top-[105px] z-10 bg-white"
              style={{ paddingTop: `${couponAndButtonsHeight}px` }}
            >
              <CafeSelector />
            </div>
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
