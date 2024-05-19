import React from "react";

interface WeeklySummaryProps {
  month: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  amount: number[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({
  month,
  weekNumber,
  startDate,
  endDate,
  amount,
}: WeeklySummaryProps) => {
  return (
    <div className="m-4 font-hyemin-bold pb-100">
      <p>주별 요약</p>
      <p>
        {month} {weekNumber}주 ({startDate} ~ {endDate}) : {amount}원
      </p>
    </div>
  );
};

export default WeeklySummary;
