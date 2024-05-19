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
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import DateNavigationButtons from "../components/restaurant/DateNavigation";
import MealTypeSelector from "../components/restaurant/MealTypeSelector";
import MenuCard from "../components/restaurant/MenuCard";
import RestaurantSelector from "../components/restaurant/RestaurantSelector";
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  useEffect(() => {
    const localId = localStorage.getItem("restaurantId");
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
    dateObj.setUTCHours(dateObj.getUTCHours() + 9);

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

  if (isLoading) {
    return <Loading />;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="sticky top-0 bg-white">
        <NavBar goBack={goBack} />
        <div className="flex flex-col items-center justify-center">
          <RestaurantSelector
            restaurant={restaurant}
            restaurantList={restaurantList || []}
            setRestaurant={setRestaurant}
            rendering={rendering}
          />
          <hr className="w-full mt-2" />
          <DateNavigationButtons
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            goToPreviousWeek={goToPreviousWeek}
            goToNextWeek={goToNextWeek}
            weekDates={weekDates}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
        <hr className="h-2 w-full" />
        <MealTypeSelector
          mealTypes={mealTypes}
          mealTypeDisplayNames={mealTypeDisplayNames}
          mealType={mealType}
          setMealType={setMealType}
        />
        <hr className="h-2 w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[20px] px-2">
        {menus.length > 0 ? (
          menus.map((menu, index) => <MenuCard key={index} menu={menu} />)
        ) : (
          <p className="text-center w-full">
            <Nodata content="메뉴가" />
          </p>
        )}
      </div>
      <BottomTabBar />
    </div>
  );
}

export default RestaurantMainPage;
