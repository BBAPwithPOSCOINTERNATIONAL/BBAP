import React, { useState } from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import CalendarComponent from "../components/calendar/CalenderComponent";
import question from "../assets/button/question.png";
import Modal from "../components/calendar/subsidymodal"; // 모달 컴포넌트를 import 합니다.
import WeeklySummary from "../components/receipt/Summary";

function MyReceiptPage() {
  const [date, setDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState<Record<string, string>>({});
  const [questData, setQuestData] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 저장하는 변수를 추가합니다.

  const handleChangeDate = (value: Date | Date[] | null) => {
    // 날짜 값 확인 및 상태 업데이트
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value)) {
      // 날짜 배열이 선택되면 첫 번째 날짜를 선택하거나 다른 로직을 적용할 수 있습니다.
      setDate(value[0]);
    }
    // null인 경우 상태 변경을 건너뛸 수 있습니다.
  };

  // question 이미지를 클릭하면 모달 상태를 토글하는 핸들러 함수를 만듭니다.
  const handleQuestionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 사용자가 날짜를 클릭했을 때 호출될 함수
  const handleClickDate = (click: boolean) => {
    console.log("Date clicked:", click);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* CalendarComponent를 페이지에 추가 */}
        <CalendarComponent
          date={date}
          onChange={handleChangeDate}
          diaryData={diaryData}
          questData={questData}
          setClick={handleClickDate}
        />
        <WeeklySummary />
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
