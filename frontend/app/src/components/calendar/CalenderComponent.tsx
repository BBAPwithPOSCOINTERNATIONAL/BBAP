import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, differenceInWeeks } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays, isAfter } from "date-fns";
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
    <div
      className="font-hyemin-bold"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: "1rem",
        width: "100vw",
        height: "20vh",
        backgroundColor: "#EFF7FF",
        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.3)", // 그림자 추가
        position: "fixed",
        gap: "0.7rem",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            // flexDirection: "row",
            gap: "0.7rem",
            marginBottom: "0.3rem",
            fontSize: "25px",
            alignItems: "center",
          }}
        >
          <img
            src={back}
            onClick={prevMonth}
            style={{ height: "1.3rem", paddingLeft: "0.5rem" }}
          />
          <div>
            <span className="text">
              <span className="text month">
                {format(currentMonth, "yyyy")}년
              </span>
              {"  "}
              {format(currentMonth, "M")}월
            </span>
          </div>
          <img src={next} onClick={nextMonth} style={{ height: "1.3rem" }} />
        </div>
        <div style={{ paddingLeft: "0.5rem", fontSize: "18px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div style={{ width: "26vw" }}>총 결제금액</div>
            <div>{data.totalPaymentAmountSum.toLocaleString()} 원</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div style={{ width: "26vw" }}>총 지원금</div>
            <div style={{ color: "green" }}>
              {data.useSubsidySum.toLocaleString()} 원
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div style={{ width: "26vw" }}>총 본인부담금</div>
            <div style={{ color: "blue" }}>
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
        width: "90vw",
        marginTop: "0.5rem",
        marginLeft: "5vw",
        marginRight: "5vw",
        fontSize: "18px",
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

const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

const RenderCells = ({
  currentMonth,
  selectedDate,
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
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day;
      formattedDate = format(day, "d"); // 날짜 텍스트를 형식화하여 할당
      const dayData = paymentsMap.get(day.getDate());
      days.push(
        <div
          key={day.toISOString()}
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          } ${isToday(day) ? "today" : ""}`}
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
          onClick={() => onDateClick(currentDay)}
        >
          <span
            className={`
            ${
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
            border border-black // 선 스타일링
            bg-blue-100 // 배경색 
          `}
            // 일자별 숫자나오는칸 스타일링
            style={{
              borderLeft: "2px solid rgb(105, 103, 126)",
              borderRight: "2px solid rgb(105, 103, 126)",
              borderTop: "2px solid rgb(105, 103, 126)",
              height: "1.3rem",
              fontSize: "15px",
              justifyContent: "center",
              paddingLeft: "1rem",
            }}
          >
            {formattedDate}
          </span>
          {/* 일자별 지원금과 본인부담금 나오는 칸 스타일링 */}
          <div
            className="
             hover:bg-blue-200"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90%",
              width: "100%",
              justifyContent: "center",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
              border: "2px solid rgb(105, 103, 126)",
              overflow: "auto",
              alignItems: "center",
            }}
          >
            {dayData && (
              <div style={{ marginTop: "5px" }}>
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
          marginLeft: "1vw",
          marginRight: "1vw",
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
        height: "100%",
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
        height: "100%",
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
          paddingTop: "22vh",
          marginLeft: "1rem",
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
