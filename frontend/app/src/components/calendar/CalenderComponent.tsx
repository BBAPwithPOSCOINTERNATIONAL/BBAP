import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

interface RenderHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
}

const RenderHeader: React.FC<RenderHeaderProps> = ({
  currentMonth,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontSize: "30px",
        }}
      >
        <div>
          <img
            src="../../assets/button/back.png"
            style={{ width: "30px" }}
            alt="Previous Month"
            onClick={prevMonth}
          />
        </div>
        <div className="col col-start">
          <span className="text">
            <span className="text month">
              {format(currentMonth, "yyyy")}년 {format(currentMonth, "M")}월
            </span>
          </span>
        </div>
        <div className="col col-end">
          <img
            src="../button/next.png"
            alt="Next Month"
            style={{ width: "30px" }}
            onClick={nextMonth}
          />
        </div>
      </div>
    </div>
  );
};

const RenderDays: React.FC = () => {
  const days: JSX.Element[] = [];
  const date: string[] = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
  ];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className="col"
        key={i}
        style={{ marginLeft: "0.1rem", marginRight: "0.1rem" }}
      >
        {date[i]}
      </div>
    );
  }

  return (
    <div className="days row" style={{ display: "flex", marginLeft: "1px" }}>
      {days}
    </div>
  );
};

interface RenderCellsProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (day: Date) => void;
}

const RenderCells: React.FC<RenderCellsProps> = ({
  currentMonth,
  selectedDate,
  onDateClick,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    target.classList.add("hovered");
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    target.classList.remove("hovered");
  };

  const rows: JSX.Element[] = [];
  let days: JSX.Element[] = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = addDays(day, 1);
      formattedDate = format(cloneDay, "d");
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day.getTime()} // Ensure unique key
          onClick={() => onDateClick(cloneDay)} // Pass the date object directly
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day.getTime()}>
        {days}
      </div>
    );
    days = [];
  }
  return (
    <div className="body">
      {React.Children.map(rows, (row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {React.Children.map(row.props.children, (cell, cellIndex) => (
            <div
              className={cell.props.className}
              key={cellIndex}
              onClick={cell.props.onClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {cell.props.children}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const CalendarComponent: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };
  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </div>
  );
};
export default CalendarComponent;
