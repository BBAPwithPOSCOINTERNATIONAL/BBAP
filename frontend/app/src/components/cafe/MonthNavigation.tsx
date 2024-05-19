import React from "react";
import back from "/assets/images/button/back.png";
import next from "/assets/images/button/next.png";

interface MonthNavigationProps {
  date: { year: number; month: number };
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const MonthNavigation: React.FC<MonthNavigationProps> = ({
  date,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <div className="flex justify-center space-x-5 py-2">
      <button onClick={handlePrevMonth}>
        <img src={back} alt="back" />
      </button>
      <span className="text-2xl">
        {date.year}년 {date.month}월
      </span>
      <button onClick={handleNextMonth}>
        <img src={next} alt="next" />
      </button>
    </div>
  );
};

export default MonthNavigation;
