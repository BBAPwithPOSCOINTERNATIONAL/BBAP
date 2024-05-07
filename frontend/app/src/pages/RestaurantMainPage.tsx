import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import BottomTabBar from "../components/BottomTabBar";
import {
  fetchRestaurantData,
  Restaurant,
  Menu,
  fetchMenus,
  FetchMenuParams,
} from "../api/restaurantAPI";
// import { useQuery } from "@tanstack/react-query";

function RestaurantMainPage() {
  const [restaurant, setRestaurant] = useState<number>(0);
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [mealType, setMealType] = useState<number>(0);
  const [menus, setMenus] = useState<Menu[]>([]);
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
  const dayOfWeekString = `${daysOfWeek[today.getDay() - 1]} \n ${dateString}`;
  const [selectedDay, setSelectedDay] = useState<string>(dayOfWeekString);

  const rendering = async (restaurantId: number) => {
    try {
      const result = await fetchRestaurantData(restaurantId);

      const currentRestaurantId = result.data.restaurantId;

      setRestaurant(
        result.data.restaurantList.find(
          (item) => item.restaurantId === currentRestaurantId
        )!.restaurantId
      );
      setRestaurantList(result.data.restaurantList);
      setMenus(result.data.menuList);
      setMealType(result.data.mealClassification);
    } catch (error) {
      console.error("식당 리스트 요청 실패", error);
    }
  };

  useEffect(() => {
    //로컬 스토리지에 저장되어 있는 기존의 선택 옵션을 불러옴
    const localId = localStorage.getItem("restaurantId");

    //없다면 -1로 리스트 요청
    rendering(localId == null ? -1 : parseInt(localId));
  }, []);

  useEffect(() => {
    renderMenus();
  }, [selectedDay, restaurant, mealType]);

  useEffect(() => {
    setWeekDates(generateWeekDates(selectedDate));
    updateNavigationControls();
  }, [selectedDate]);

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

  const mealTypes: number[] = [1, 2, 3, 4];

  const mealTypeDisplayNames: Record<number, string> = {
    1: "아침",
    2: "점심",
    3: "저녁",
    4: "도시락",
  };

  const renderMenus = async () => {
    const [, date] = selectedDay.split("\n");
    const [month, day] = date.split(".");
    const year = selectedDate.getFullYear();
    const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
    dateObj.setUTCHours(dateObj.getUTCHours() + 9); // 한국 시간대로 변환

    const params: FetchMenuParams = {
      restaurantId: restaurant!,
      menuDate: dateObj,
      mealClassification: mealType!,
    };

    try {
      const result = await fetchMenus(params);
      console.log(result.data);

      setMenus(result.data.menuList);
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <select
          value={restaurant}
          onChange={(e) => {
            setRestaurant(parseInt(e.target.value));
            rendering(parseInt(e.target.value));
            //식당 선택 시 로컬스토리지에 저장
            localStorage.setItem("restaurantId", e.target.value);
          }}
        >
          {restaurantList?.map((r) => (
            <option key={r.restaurantId} value={r.restaurantId}>
              {r.restaurantName}
            </option>
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
                    console.log(date);
                    setSelectedDay(date);
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
      <div className="mx-1 flex flex-wrap justify-start">
        {mealTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setMealType(type);
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className={`m-2 font-hyemin-bold py-2 px-2 rounded-full w-16 h-8 ${
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
                {menu.menuName}
              </h1>
            </div>
            <hr className="h-1 bg-[#346186]" />
            <div className="flex-grow p-4 md:p-5">
              {menu.menuImage && (
                <img
                  src={menu.menuImage}
                  alt="Menu"
                  className="w-full h-auto mt-1 border"
                  style={{ maxHeight: "200px" }}
                />
              )}
              <hr className="h-1 bg-[#346186]" />
              <p className="mt-2 text-center text-gray-500 dark:text-neutral-400">
                {menu.menuDetail}
              </p>
            </div>
            <hr className="h-1 bg-[#346186]" />
            <div className="bg-cafe-primary-color rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
              <p className="mt-1 text-lg text-center">{menu.menuPrice} 원</p>
            </div>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
