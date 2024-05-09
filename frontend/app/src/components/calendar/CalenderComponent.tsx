import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, differenceInWeeks } from "date-fns";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
} from "date-fns";
import { addDays, isAfter } from "date-fns";
import {
  getMonthlyPayments,
  getDailyPayments,
  PaymentData,
} from "../../api/paymentsAPI";

import group from "/assets/images/group.png";
import back from "/assets/images/button/back.png";
import next from "/assets/images/button/next.png";
import "./_style.scss";

import { NavigateFunction, useNavigate } from "react-router-dom";
interface RenderHeaderProps {
  currentMonth: Date;
  prevMonth: () => void;
  nextMonth: () => void;
  data: PaymentData;
}

const RenderHeader: React.FC<RenderHeaderProps> = ({
  currentMonth,
  prevMonth,
  nextMonth,
  data,
}: RenderHeaderProps) => {
  return (
    <div className="font-hyemin-bold flex justify-start p-4 w-full h-17vh bg-[#EFF7FF] shadow-md fixed gap-1.75">
      <div>
        <div className="flex gap-4 mb-1 text-xl items-center">
          <img src={back} onClick={prevMonth} className="h-5 pl-2" />
          <div>
            <span className="text month">
              {format(currentMonth, "yyyy")}년 {"  "}
              {format(currentMonth, "M")}월
            </span>
          </div>
          <img src={next} onClick={nextMonth} className="h-5" />
        </div>
        <div className="pl-2 text-lg justify-between w-full">
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-40vw">총 결제금액</div>
            <div>{data.totalPaymentAmountSum.toLocaleString()} 원</div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-40vw">총 지원금</div>
            <div className="text-green-500">
              {data.useSubsidySum.toLocaleString()} 원
            </div>
          </div>
          <div className="flex flex-row gap-4 justify-between">
            <div className="w-40vw">총 본인부담금</div>
            <div className="text-blue-500">
              {data.selfPaymentSum.toLocaleString()} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i} style={{}}>
        {date[i]}
      </div>
    );
  }

  return (
    // 일월화수목금토 나열스타일링
    <div
      className="font-hyemin-bold"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "88vw",
        marginTop: "0.5rem",
        marginLeft: "6vw",
        marginRight: "6vw",
        fontSize: "15px",
      }}
    >
      {days.map((day, index) => (
        <div className="col" key={index}>
          {day}
        </div>
      ))}
    </div>
  );
};

const RenderCells = ({
  currentMonth,
  data,
  navigation,
}: {
  currentMonth: Date;
  selectedDate: Date;
  data: PaymentData;
  navigation: NavigateFunction;
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const totalWeeks = differenceInWeeks(endDate, startDate); // 총 주 수 계산
  const rowHeight = totalWeeks === 5 ? "10vh" : "12vh"; // 주 수에 따라 높이 지정

  const paymentsMap = new Map();
  data.dayPaymentList.forEach((payment) => {
    paymentsMap.set(payment.day, payment);
  });

  const onDateClick = async (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    try {
      const dailyPayments = await getDailyPayments(dateString);
      console.log("Daily Payments for " + dateString + ":", dailyPayments);
      navigation("/receiptDetail", {
        state: { date: dateString, payments: dailyPayments },
      });
    } catch (error) {
      console.error(
        "Failed to fetch daily payments for",
        dateString,
        ":",
        error
      );
    }
  };

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day;
      const formattedDate = format(day, "d"); // 날짜 텍스트를 형식화하여 할당
      const dayData = paymentsMap.get(day.getDate());
      const isCurrentMonth = isSameMonth(currentDay, currentMonth);
      const opacityClass = isCurrentMonth ? "" : "opacity-50 bg-indigo-50"; // 현재 달이 아닌 날짜에 대한 불투명 클래스

      days.push(
        <div
          key={day.toISOString()}
          style={{
            height: "98%",
            display: "flex",
            flexDirection: "column",
            width: "85vw",
            flex: 1,
          }}
          onClick={() => onDateClick(currentDay)}
        >
          <span
            className={`
            bg-blue-100 border-transparent rounded-t-lg shadow-right ${opacityClass} 
          `}
            // 일자별 숫자나오는칸 스타일링
            style={{
              borderColor: "gray",
              borderLeft: "1px solid rgb(105, 103, 126)",
              borderRight: "1px solid rgb(105, 103, 126)",
              borderTop: "1px solid rgb(105, 103, 126)",
              height: "1.3rem",
              fontSize: "10px",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {formattedDate}
          </span>
          {/* 일자별 지원금과 본인부담금 나오는 칸 스타일링 */}
          <div
            className={`bg-slate-50 border-transparent rounded-b-lg hover:bg-blue-200 shadow-right ${opacityClass}`}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              width: "100%",
              justifyContent: "center",
              fontWeight: "bold",
              // borderColor: 'gray',
              borderLeft: "1px solid rgb(105, 103, 126)",
              borderRight: "1px solid rgb(105, 103, 126)",
              borderBottom: "1px solid rgb(105, 103, 126)",
              overflow: "auto",
              alignItems: "center",
              textAlign: "center",
              fontSize: "10px",
            }}
          >
            {dayData && (
              <div>
                <div style={{ color: "green" }}>
                  {dayData.useSubsidy.toLocaleString()}원
                </div>
                <div style={{ color: "blue" }}>
                  {dayData.selfPayment.toLocaleString()}원
                </div>
              </div>
            )}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      // 달력전체
      <div
        key={format(day, "yyyy-MM-dd")}
        style={{
          height: rowHeight,
          display: "flex",
          flexDirection: "row",
          gap: "0.11rem",
          marginLeft: "1vw",
          marginRight: "1vw",
          marginBottom: "0.2rem",
        }}
      >
        {days}
      </div>
    );
    days = [];
  }
  return (
    <div
      style={{
        height: "95%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {rows}
    </div>
  );
};

export const CalendarComponent = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate] = useState(new Date());
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  // 현재 달의 결제 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchPayments = async () => {
      const formattedMonth = format(currentMonth, "yyyy-MM");
      try {
        const response = await getMonthlyPayments(formattedMonth);
        setPaymentData(response.data);
        console.log("Payment data for month:", formattedMonth, response.data);
      } catch (error) {
        console.error(
          "Failed to fetch payment data for",
          formattedMonth,
          ":",
          error
        );
      }
    };

    fetchPayments();
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    const maxDate = new Date(2024, 5); // 2024년 6월 (월 인덱스는 0부터 시작하므로 5는 6월을 의미)
    if (isAfter(addMonths(currentMonth, 1), maxDate)) {
      return;
    }
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div
      style={{
        height: "85%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      {paymentData && (
        <RenderHeader
          currentMonth={currentMonth}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          data={paymentData}
        />
      )}
      <img
        src={group}
        alt="지원금 및 본인부담금"
        style={{
          paddingTop: "19vh",
          marginLeft: "1rem",
          width: "40vw",
        }}
      />
      <RenderDays />
      {paymentData && (
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          data={paymentData}
          navigation={navigate}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
