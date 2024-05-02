import { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import question from "/assets/images/button/question.png";

function ReceiptDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.

  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="font-hyemin-bold text-3xl text-center"> 식당이름</div>
      <div className="font-hyemin-bold text-xl text-center">
        {" "}
        구매한 시간이 여기 뜰거입니댜
      </div>
      {/* question 이미지를 클릭하면 모달을 열도록 합니다. */}
      <img
        src={question}
        className="fixed bottom-28 right-0 mb-4 mr-2 cursor-pointer"
        onClick={handleQuestionClick}
      />
      {/* 모달을 렌더링합니다. isOpen 상태에 따라 모달이 열리거나 닫힙니다. */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      <BottomTabBar />
    </div>
  );
}

export default ReceiptDetail;

// 결제내역 (상세) Success response
// {
//   "message" : "Success.",
//   "data" :
//    {
//       "totalPaymentAmount" : int,
//       "useSubsidy" : int,
//       "selfPayment" : int,
//       "paymentDetail" : string,
//       "payStore" : string,
//       "historyMemo" : string,
//       "paymentDate" : LocalDateTime
//    }
// }
