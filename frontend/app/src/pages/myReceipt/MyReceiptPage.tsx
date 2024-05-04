import { useState } from "react";
import NavBar from "../../components/Navbar";
import BottomTabBar from "../../components/BottomTabBar";
import CalendarComponent from "../../components/calendar/CalenderComponent";
import question from "/assets/images/button/question.png";
import Modal from "../../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
// import WeeklySummary from "../../components/receipt/Summary";
// import ReceiptDetail from "../../components/receipt/ReceiptDetail";


function MyReceiptPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.

  // question 이미지를 클릭하면 모달 상태를 토글하는 핸들러 함수를 만듭니다.
  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center pb-24">
        {/* CalendarComponent를 페이지에 추가 */}
        <CalendarComponent />
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

export default MyReceiptPage;
