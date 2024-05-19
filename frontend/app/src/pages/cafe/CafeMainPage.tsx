// import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";

import useContentStore from "../../store/contentStore";
import MyOrderPage from "./myorder/MyOrderPage";
// import {
//   createOrderRoom,
// } from "../../api/togetherAPI";

import AloneOrderPage from "./aloneorder/AloneOrderPage";
import TogetherCreateRoom from "./togetherorder/TogetherCreateRoom";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

function CafeMainPage() {
  const navigate = useNavigate();

  const { content, setContent } = useContentStore();

  // // 수정위해서 탭 고정시켜둠 _나중에 주석이나 삭제하기
  // useEffect(() => {
  //   setContent("together"); // 초기 상태를 "together"로 설정
  // }, [setContent]);

  // const [orderRoomInfo, setOrderRoomInfo] = useState<string | null>(null);
  // const [orderRoomInfo, setOrderRoomInfo] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log(orderRoomInfo);
  //   if (content === "together") {
  //     const fetchOrderRoomInfo = async () => {
  //       try {
  //         const response = await checkOrderRoomParticipation();
  //         console.log(response.data.roomId);
  //         setOrderRoomInfo(response.data.roomId);
  //       } catch (error) {
  //         console.error("Failed to fetch order room info:", error);
  //       }
  //     };
  //
  //     fetchOrderRoomInfo();
  //   }
  // }, [content]);

  const tabs = [
    { key: "alone", label: "혼자주문" },
    { key: "together", label: "같이주문" },
    { key: "history", label: "나의주문" },
  ];

  const tabsHeight = 50; // CafeTabs의 높이 추정값

  const goBack = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="sticky top-0 z-30 bg-white" style={{ height: "50px" }}>
        <NavBar goBack={goBack} />
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
              style={{ paddingTop: "5px" }}
            >
              <AloneOrderPage />
            </div>
          </>
        )}
        {content === "together" && (
          <>
            <TogetherCreateRoom />
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
