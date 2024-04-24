import React, { useState } from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import CalendarComponent from "../components/CalenderComponent";

function MyReceiptPage() {
  const [date, setDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState<Record<string, string>>({});
  const [questData, setQuestData] = useState<Record<string, string>>({});

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
      </div>
      <BottomTabBar />
    </div>
  );
}

export default MyReceiptPage;
