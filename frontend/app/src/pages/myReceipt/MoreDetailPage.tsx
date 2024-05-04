import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import question from "/assets/images/button/question.png";
import { format } from "date-fns";

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.
  const { state } = useLocation();

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const payments = state.data;

  const formattedDate = payments.paymentDate
    ? format(new Date(payments.paymentDate), "yyyy년 MM월 dd일 HH:mm:ss")
    : "";

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="font-hyemin-bold text-4xl m-5">
        {payments.payStore || "식당 정보 없음"}
      </div>
      <div className="font-hyemin-bold text-xl m-5 mt-0">{formattedDate}</div>
      <div className="m-5 mt-4 flex flex-col">
        <p className="font-hyemin-bold text-3xl">{payments.paymentDetail}</p>
        <div className="w-full">
          <div className="flex justify-between items-center text-2xl mb-2">
            <span>총 금액</span>
            <span>{payments.totalPaymentAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center text-2xl text-green-600 mb-2">
            <span>지원금</span>
            <span>{payments.useSubsidy.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center text-2xl text-blue-700 mb-2">
            <span>본인부담금</span>
            <span>{payments.selfPayment.toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <img
        src={question}
        className="fixed bottom-28 right-0 mb-4 mr-2 cursor-pointer"
        alt="Question"
        onClick={handleQuestionClick}
      />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;
