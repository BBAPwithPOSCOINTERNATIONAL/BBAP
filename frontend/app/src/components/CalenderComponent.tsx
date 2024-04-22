import React from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

interface CalendarComponentProps {
  onChange: (
    value: Date | Date[] | null,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  date: Date;
  diaryData?: Record<string, string>;
  questData?: Record<string, string>;
  setClick: (click: boolean) => void;
}

interface TileProperties {
  date: Date;
  view: string;
}

const StyledCalendar = styled(Calendar)`
  .react-calendar__month-view__days__day-names,
  .react-calendar__month-view__days__day {
    font-family: "Arial", sans-serif;
    font-size: 13px;
  }

  .react-calendar__tile--active:hover,
  .react-calendar__tile:hover {
    background-color: #f0f0f0; // 예시: 호버 시 배경 색 변경
  }

  .react-calendar__tile.saturday {
    color: #6560ff;
  }

  .react-calendar__tile.sunday {
    color: #ff8349;
  }

  .react-calendar__tile--now {
    border: 2px solid #ffa500;
  }
`;

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onChange,
  date,
  diaryData,
  questData,
  setClick,
}) => {
  const tileClassName = ({ date, view }: TileProperties) => {
    if (view === "month") {
      if (date.getDay() === 0) {
        return "text-red-500"; // 일요일 색상
      } else if (date.getDay() === 6) {
        return "text-blue-500"; // 토요일 색상
      }
    }
    return "";
  };

  const tileDisabled = ({ date, view }: TileProperties) => {
    if (view === "month") {
      const currentDate = new Date();
      const oneWeekLater = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 7
      );
      return date >= oneWeekLater;
    }
    return false;
  };

  const ClickDate = (value: Date) => {
    console.log("Date clicked:", value);
    setClick(true);
  };

  const tileContent = ({ date, view }: TileProperties) => {
    if (view === "month") {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const diaryDatas = diaryData ? diaryData[formattedDate] || "" : "";
      const questDatas = questData ? questData[formattedDate] || "" : "";

      return (
        <div className="flex flex-col items-center">
          <div className="text-sm">{diaryDatas}</div>
          <div className="text-xs text-gray-600">
            {questDatas ? `Mission: ${questDatas}%` : ""}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <StyledCalendar
        onChange={(value, event) =>
          onChange(value, event as React.MouseEvent<HTMLButtonElement>)
        }
        value={date}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
        onClickDay={ClickDate}
        tileContent={tileContent}
      />
    </div>
  );
};

export default CalendarComponent;
