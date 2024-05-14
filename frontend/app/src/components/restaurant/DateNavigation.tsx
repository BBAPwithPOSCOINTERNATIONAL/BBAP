import React from "react";
import back from "/assets/images/button/back.png";
import unactiveback from "/assets/images/button/unactiveback.png";
import next from "/assets/images/button/next.png";
import unactivenext from "/assets/images/button/unactivenext.png";

interface DateNavigationButtonsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  weekDates: string[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const DateNavigationButtons: React.FC<DateNavigationButtonsProps> = ({
  canGoBack,
  canGoForward,
  goToPreviousWeek,
  goToNextWeek,
  weekDates,
  selectedDay,
  setSelectedDay,
}) => (
  <div className="flex w-full justify-between px-4">
    <button onClick={goToPreviousWeek} disabled={!canGoBack}>
      {canGoBack ? (
        <img src={back} alt="Back Button" />
      ) : (
        <img src={unactiveback} alt="Inactive Back Button" />
      )}
    </button>
    <div className="flex justify-center my-2 w-full px-2">
      {weekDates.map((date, index) => {
        const isActive = date === selectedDay;
        return (
          <button
            key={index}
            onClick={() => {
              console.log(date);
              setSelectedDay(date);
            }}
            className={`w-1/6 text-xs font-bold  px-1 rounded text-center ${
              isActive
                ? "border-2 border-blue-500"
                : "border border-transparent"
            } hover:border-black ${
              date.split("\n")[0].includes("토")
                ? "text-blue-500"
                : date.split("\n")[0].includes("일")
                ? "text-red-500"
                : ""
            }`}
          >
            <span className="block">{date.split("\n")[0]}</span>
            <span className="block">{date.split("\n")[1]}</span>
          </button>
        );
      })}
    </div>
    <button onClick={goToNextWeek} disabled={!canGoForward}>
      {canGoForward ? (
        <img src={next} alt="Next Button" />
      ) : (
        <img src={unactivenext} alt="Inactive Next Button" />
      )}
    </button>
  </div>
);

export default DateNavigationButtons;
