import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import question from "/assets/images/button/question.png";
import { format } from "date-fns";

import receipt from "/assets/images/receipt.png";
function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state } = useLocation();

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const payments = state.data;

  const formattedDate = payments.paymentDate
    ? format(new Date(payments.paymentDate), "yyyy년 MM월 dd일 HH:mm:ss")
    : "";

  return (
    <div className="flex flex-col min-h-screen relative text-center items-center">
      <NavBar />
      <img
        src={receipt}
        alt="영수증 이미지"
        className="absolute top-28 w-94 h-[39rem] z-0"
        style={{ marginLeft: "2px" }}
      />
      <div className="relative z-10">
        {" "}
        {/* 내용을 영수증 이미지 위에 놓기 위해 relative와 z-index 사용 */}
        <div className="font-hyemin-bold text-3xl mt-3 mb-5">
          {payments.payStore || "식당 정보 없음"}
        </div>
        <div className="font-hyemin-regular text-lg m-5 mt-0">
          {formattedDate}
        </div>
        <div className="m-5 mt-4 flex flex-col items-center">
          <p className="font-hyemin-bold text-3xl">{payments.paymentDetail}</p>
          <div className="w-full">
            <div className="flex justify-between items-center text-2xl my-2">
              <span>총 금액</span>
              <span>{payments.totalPaymentAmount.toLocaleString()}원</span>
            </div>
            <div className="font-hyemin-bold flex justify-between items-center text-2xl text-green-600 mb-2">
              <span>지원금</span>
              <span>{payments.useSubsidy.toLocaleString()}원</span>
            </div>
            <div className="font-hyemin-bold flex justify-between items-center text-2xl text-blue-700 mb-2">
              <span>본인부담금</span>
              <span>{payments.selfPayment.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>
      <img
        src={question}
        className="fixed bottom-[65px] right-0 mb-4 mr-2 cursor-pointer z-20" // 물음표 아이콘도 상위 z-index 적용
        alt="Question"
        onClick={handleQuestionClick}
      />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;
