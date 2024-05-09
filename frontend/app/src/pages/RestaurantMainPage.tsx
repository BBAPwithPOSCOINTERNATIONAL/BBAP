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
import back from "/assets/images/button/back.png";
import unactiveback from "/assets/images/button/unactiveback.png";
import next from "/assets/images/button/next.png";
import unactivenext from "/assets/images/button/unactivenext.png";
// import { useQuery } from "@tanstack/react-query";
import { IoMdPerson } from "react-icons/io";
import Nodata from "../components/nodata";

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
    <div className="flex flex-col min-h-screen pb-20">
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <select
          className="font-hyemin-bold bg-blue-200 w-11/12 text-lg h-9 text-center rounded-md mt-2"
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
              {r.restaurantName}({r.workplaceName})
            </option>
          ))}
        </select>

        <hr className=" w-full mt-2" />
        <div className="flex w-full justify-between px-4">
          {/* 이전 주로 가는 버튼 */}
          <button onClick={goToPreviousWeek} disabled={!canGoBack}>
            {canGoBack ? (
              <img src={back} alt="Back Button" />
            ) : (
              <img src={unactiveback} alt="Inactive Back Button" />
            )}
          </button>
          {/* 월화수목금토일 */}
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
          {/* 다음주로가는 버튼 */}
          <button onClick={goToNextWeek} disabled={!canGoForward}>
            {canGoForward ? (
              <img src={next} alt="Back Button" />
            ) : (
              <img src={unactivenext} alt="Inactive Back Button" />
            )}
          </button>
        </div>
        <hr className="w-full" />
      </div>
      {/* 아침/점심/저녁/도시락 */}
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
            className={`m-1 font-hyemin-bold py-2 px-1 rounded-full w-16 h-8 ${
              mealType === type ? "bg-[#739DB5] text-white" : "bg-[#E2F1FF]"
            }`}
          >
            {mealTypeDisplayNames[type]}
          </button>
        ))}
      </div>
      <hr className="h-2 w-full" />
      {/* 메뉴카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[20px] px-2">
        {menus.length > 0 ? (
          menus.map((menu, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border-2 shadow-sm rounded-md dark:bg-neutral-900 dark:border-neutral-900 dark:shadow-neutral-700/70 h-full" // Ensure the card takes full height of its container
            >
              <div className="flex gap-[1px] bg-[#739DB5] text-white border rounded-t-md py-2 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
                <h1 className="text-lg mx-auto font-hyemin-bold dark:text-white text-center">
                  {menu.menuName}
                </h1>
                <IoMdPerson className="text-lg mr-1 mt-1 font-hyemin-bold dark:text-white align-center" />
                <h1 className="text-lg mr-1rem font-hyemin-bold dark:text-white text-center">
                  {menu.eatCount}
                </h1>
              </div>
              <div className="flex-grow p-1 md:p-1">
                {menu.menuImage && (
                  <img
                    src={menu.menuImage}
                    alt="Menu"
                    className="w-4/5 h-auto my-1 border flex mx-auto"
                    style={{ maxHeight: "200px" }}
                  />
                )}
                <p className="mt-2 text-center bg-[#E2F1FF] p-2 rounded-md text-sm text-gray-800 dark:text-neutral-400">
                  {menu.menuDetail}
                </p>
              </div>
              <hr className="h-1" />
              <div className="font-bold bg-[#739DB5] text-white rounded-b-md py-1 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
                <p className="mt-1 text-lg text-center">{menu.menuPrice} 원</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full">
            <Nodata />
          </p>
        )}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
