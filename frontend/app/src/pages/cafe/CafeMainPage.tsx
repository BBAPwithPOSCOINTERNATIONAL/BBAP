import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import CafeTabs from "../../components/cafe/CafeTabs";
import CafeCoupon from "../../components/cafe/CafeCoupon";
import menu from "../../assets/cafe-menu.json";

interface MenuItem {
  name: string;
  price: number;
  description: string;
  images: string;
  temperature: string[];
  size: string[];
  options: { [key: string]: number };
}

function CafeMainPage() {
  const [content, setContent] = useState("alone");
  const [selectedCafe, setSelectedCafe] = useState("A카페");
  const tabs = [
    { key: "alone", label: "혼자주문" },
    { key: "together", label: "같이주문" },
    { key: "history", label: "나의주문" },
  ];

  const [orderCount, setOrderCount] = useState(10);
  const [couponCount, setCouponCount] = useState(9);

  // 게이지 바 색상 설정을 위한 함수
  const getGaugeColor = (index: number): string => {
    if (index <= couponCount) {
      return "bg-primary-color"; // 주문량까지의 부분은 녹색으로 표시
    } else {
      return "bg-sky-200"; // 주문량 이후의 부분은 회색으로 표시
    }
  };

  // 게이지 바 생성을 위한 배열
  const gaugeBars = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className={`h-4 w-full ${getGaugeColor(index + 1)} rounded-sm`}
    ></div>
  ));

  return (
    <div>
      <NavBar />
      <CafeTabs content={content} setContent={setContent} tabs={tabs} />
      <div className="mt-8">
        {content === "alone" && (
          <>
            <div className="mt-2 flex flex-col items-center">
              <select
                id="cafe-select"
                value={selectedCafe}
                onChange={(e) => setSelectedCafe(e.target.value)}
                className="bg-primary-color text-white border rounded-md p-1 w-11/12 font-hyemin-bold text-center"
              >
                <option value="A카페">A카페</option>
                <option value="B카페">B카페</option>
                <option value="C카페">C카페</option>
              </select>
            </div>
            <CafeCoupon
              orderCount={orderCount}
              couponCount={couponCount}
              gaugeBars={gaugeBars}
            />
            <ul>
              {menu.coffee.map((item: MenuItem, index: number) => (
                <li key={index}>
                  <h2>
                    {item.name} - {item.price}원
                  </h2>
                  <p>{item.description}</p>
                  <img
                    src={item.images}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
        {content === "together" && <div>같이 주문하는 페이지입니다.</div>}
        {content === "history" && <div>주문 내역을 보는 페이지입니다.</div>}
      </div>
    </div>
  );
}

export default CafeMainPage;
