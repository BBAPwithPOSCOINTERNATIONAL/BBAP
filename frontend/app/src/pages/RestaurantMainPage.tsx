import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import { menuDatas, DailyMenu, MenuItem } from "../components/menuDatas";
// import { RestaurantData } from "../api/restaurantAPI";
// import { useQuery } from "@tanstack/react-query";

function RestaurantMainPage() {
  // const { data, isError, isLoading, error } = useQuery(
  //   ["restaurant", restaurantId],
  //   () => RestaurantData(restaurantId),
  //   {
  //     // 조건부 쿼리 실행
  //     enabled: restaurantId !== -1,
  //   }
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (isError)
  //   return (
  //     <div>
  //       Error: {error instanceof Error ? error.message : "Unknown error"}
  //     </div>
  //   );

  const [restaurant, setRestaurant] = useState<string>("A");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [mealType, setMealType] = useState<keyof DailyMenu>("Breakfast");
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [canGoBack, setCanGoBack] = useState<boolean>(true);
  const [canGoForward, setCanGoForward] = useState<boolean>(true);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit" as const,
    day: "2-digit" as const,
  };
  const dateString = today
    .toLocaleDateString("ko-KR", options)
    .replace(/\.$/, "");
  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
  const dayOfWeekString = `${daysOfWeek[today.getDay()]} \n ${dateString}`;
  const [selectedDay, setSelectedDay] = useState<string>(dayOfWeekString);

  useEffect(() => {
    setSelectedDay(dayOfWeekString);

    setWeekDates(generateWeekDates(selectedDate));
    updateNavigationControls();
    fetchMenus(dayOfWeekString);
  }, [selectedDate, restaurant, mealType]);

  const updateNavigationControls = () => {
    const today = new Date();
    const startOfCurrentWeek = new Date(today);
    startOfCurrentWeek.setDate(
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
    );

    const oneWeekAgo = new Date(startOfCurrentWeek);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAhead = new Date(startOfCurrentWeek);
    oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);

    setCanGoBack(selectedDate >= oneWeekAgo);
    setCanGoForward(selectedDate <= oneWeekAhead);
  };

  const generateWeekDates = (start: Date): string[] => {
    const result: string[] = [];
    const dayOfWeek = start.getDay();
    const startOfWeek = new Date(start);
    startOfWeek.setDate(
      start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    );

    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
    };
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      let formattedDate = day.toLocaleDateString("ko-KR", options);
      formattedDate = formattedDate.replace(/\.$/, "");
      result.push(`${daysOfWeek[i]} \n ${formattedDate}`);
    }
    return result;
  };

  const goToPreviousWeek = (): void => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = (): void => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const mealTypes: (keyof DailyMenu)[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Lunchbox",
  ];

  const mealTypeDisplayNames: Record<keyof DailyMenu, string> = {
    Breakfast: "아침",
    Lunch: "점심",
    Dinner: "저녁",
    Lunchbox: "도시락",
  };

  const fetchMenus = (dayString: string) => {
    const [, date] = dayString.split("\n");
    const [month, day] = date.split(".");
    const year = selectedDate.getFullYear();
    const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
    const dayIndex = dateObj.getDay();
    const dayOfWeekEnglish = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIndex];
    const selectedMenus = menuDatas[restaurant][dayOfWeekEnglish][mealType];
    setMenus(selectedMenus);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <select
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        >
          {["A", "B", "C"].map((r) => (
            <option key={r} value={r}>{`Restaurant ${r}`}</option>
          ))}
        </select>

        <div className="flex justify-center my-2">
          <button
            onClick={goToPreviousWeek}
            disabled={!canGoBack}
            className={`m-1 text-xs font-bold py-2 px-2 rounded ${
              canGoBack
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 text-white"
            }`}
          >
            ◀
          </button>
          <div className="flex justify-center my-2">
            {weekDates.map((date, index) => {
              const isActive = date === selectedDay;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedDay(date);
                    fetchMenus(date);
                  }}
                  className={`w-1/11 text-xs font-bold py-2 px-1 rounded text-center ${
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
          <button
            onClick={goToNextWeek}
            disabled={!canGoForward}
            className={`m-1 text-xs font-bold py-2 px-2 rounded ${
              canGoForward
                ? "bg-gray-300 hover:bg-gray-400"
                : "bg-gray-200 text-white"
            }`}
          >
            ▶
          </button>
        </div>
        <hr className="h-2  mx-auto w-11/12" />
      </div>
      <div className="mx-1">
        {mealTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setMealType(type);
              fetchMenus(selectedDay);
            }}
            className={`m-2 font-hyemin-bold py-2 px-2 rounded ${
              mealType === type ? "bg-[#739DB5] text-white" : "bg-[#E2F1FF]"
            }`}
          >
            {mealTypeDisplayNames[type]}
          </button>
        ))}
      </div>
      <hr className="h-2  mx-auto w-11/12" />

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 h-full" // Ensure the card takes full height of its container
          >
            <div className="bg-cafe-primary-color border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
              <h1 className="text-lg font-hyemin-bold dark:text-white text-center">
                {menu.mainMenu}
              </h1>
            </div>
            <hr className="h-1 bg-[#346186]" />
            <div className="flex-grow p-4 md:p-5">
              {" "}
              {menu.imageUrl && (
                <img
                  src={menu.imageUrl}
                  alt="Menu"
                  className="w-full h-auto mt-1 border"
                  style={{ maxHeight: "200px" }}
                />
              )}
              <hr className="h-1 bg-[#346186]" />
              <p className="mt-2 text-center text-gray-500 dark:text-neutral-400">
                {menu.subMenus.join(" / ")}
              </p>
            </div>
            <hr className="h-1 bg-[#346186]" />
            <div className="bg-cafe-primary-color rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
              <p className="mt-1 text-lg text-center">
                {menu.price.toFixed(2)} 원
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
