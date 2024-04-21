import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import { menuDatas, DailyMenu } from "../components/menuDatas";

function RestaurantMainPage() {
  const [restaurant, setRestaurant] = useState<string>("A");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [mealType, setMealType] = useState<keyof DailyMenu>("Breakfast");
  const [menu, setMenu] = useState<string>("");

  useEffect(() => {
    const dates = generateWeekDates(selectedDate);
    setWeekDates(dates);
  }, [selectedDate]);

  const generateWeekDates = (start: Date) => {
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
      // Format the date and rearrange the components
      let formattedDate = day.toLocaleDateString("ko-KR", options);
      formattedDate = formattedDate.replace(/(\.\s)$/, "");
      result.push(`${daysOfWeek[i]} \n ${formattedDate}`);
    }
    return result;
  };

  const mealTypes: (keyof DailyMenu)[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Lunchbox",
  ];

  const fetchMenu = (day: string) => {
    const dayOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ][new Date(day).getDay() - 1];
    const selectedMenu = menuDatas[restaurant][dayOfWeek][mealType];
    setMenu(
      `Menu: ${selectedMenu.mainMenu}, Submenus: ${selectedMenu.subMenus.join(
        ", "
      )}, Price: $${selectedMenu.price}`
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <select
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}
        >
          <option value="A">Restaurant A</option>
          <option value="B">Restaurant B</option>
          <option value="C">Restaurant C</option>
        </select>

        <div className="my-4">
          {weekDates.map((date, index) => (
            <button
              key={index}
              onClick={() => fetchMenu(date)}
              className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {date}
            </button>
          ))}
        </div>

        <div>
          {mealTypes.map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 border rounded shadow">
          {menu && <p>{menu}</p>}
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
