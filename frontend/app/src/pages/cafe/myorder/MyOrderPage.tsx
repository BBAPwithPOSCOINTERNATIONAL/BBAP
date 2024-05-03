import { useEffect, useState } from "react";
// import { getMyOrder } from "../../../api/Order";
import DetailModal from "./DetailModal";
import back from "/assets/images/button/back.png";
import next from "/assets/images/button/next.png";

export type Order = {
  orderId: string;
  pickUpTime: string; // DATETIME 타입을 문자열로 처리
  cafeName: string;
  firstMenuName: string;
  menuCnt: number;
  payAmount: number;
  workPlaceName: string;
};

export type OrdersData = {
  message: string;
  data: {
    orderList: Order[];
  };
};

const dummyData: { [key: string]: Order[] } = {
  "2024-04": [
    {
      orderId: "order001",
      pickUpTime: "2024-04-10T15:00:00",
      cafeName: "Cafe Latte",
      firstMenuName: "Latte",
      menuCnt: 4,
      payAmount: 8000,
      workPlaceName: "Cafe Latte Branch 1",
    },
    {
      orderId: "order002",
      pickUpTime: "2024-04-10T15:30:00",
      cafeName: "Espresso House",
      firstMenuName: "Espresso",
      menuCnt: 1,
      payAmount: 4000,
      workPlaceName: "Espresso House Central",
    },
    {
      orderId: "order003",
      pickUpTime: "2024-04-30T15:30:00",
      cafeName: "Smoothie Station",
      firstMenuName: "Berry Smoothie",
      menuCnt: 3,
      payAmount: 15000,
      workPlaceName: "Smoothie Station Downtown",
    },
  ],
  "2024-05": [
    {
      orderId: "order003",
      pickUpTime: "2024-05-10T16:00:00",
      cafeName: "Smoothie Station",
      firstMenuName: "Berry Smoothie",
      menuCnt: 3,
      payAmount: 15000,
      workPlaceName: "Smoothie Station Downtown",
    },
  ],
  "2024-03": [
    {
      orderId: "order004",
      pickUpTime: "2024-03-10T17:00:00",
      cafeName: "Tea House",
      firstMenuName: "Green Tea",
      menuCnt: 2,
      payAmount: 5000,
      workPlaceName: "Tea House Suburb",
    },
  ],
};

const MyOrderPage = () => {
  const [date, setDate] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const monthString = `${date.year}-${date.month
      .toString()
      .padStart(2, "0")}`;
    const ordersForMonth = dummyData[monthString] || [];

    // 수령완료 아닌것들만 정렬
    const sortedOrders = ordersForMonth.sort((a, b) => {
      const currentTime = new Date();
      const pickUpTimeA = new Date(a.pickUpTime);
      const pickUpTimeB = new Date(b.pickUpTime);
      const isReceivedA = pickUpTimeA <= currentTime;
      const isReceivedB = pickUpTimeB <= currentTime;

      if (!isReceivedA && isReceivedB) {
        return -1;
      } else if (isReceivedA && !isReceivedB) {
        return 1;
      } else {
        return pickUpTimeA.getTime() - pickUpTimeB.getTime();
      }
    });

    setOrders(sortedOrders);
  }, [date]);

  // useEffect(() => {
  //   getMyOrder(date.year, date.month).then((data) => {
  //     setOrders(data.data.orderList);
  //   });
  // }, [date]);

  const handleCardClick = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrevMonth = () => {
    setDate((prev) => {
      if (prev.month === 1) {
        return { year: prev.year - 1, month: 12 };
      }
      return { ...prev, month: prev.month - 1 };
    });
  };

  const handleNextMonth = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // JavaScript의 월은 0부터 시작하므로 +1

    setDate((prev) => {
      if (
        prev.year > currentYear ||
        (prev.year === currentYear && prev.month >= currentMonth)
      ) {
        // 현재 년도, 현재 월 또는 그 이후의 데이터로는 넘어갈 수 없음
        return prev;
      } else if (prev.month === 12) {
        // 12월에서 다음 해 1월로 넘어감
        return { year: prev.year + 1, month: 1 };
      } else {
        // 그 외의 경우 다음 월로 넘어감
        return { ...prev, month: prev.month + 1 };
      }
    });
  };

  return (
    <div className="font-hyemin-bold">
      <div className="flex justify-center space-x-5">
        <button onClick={handlePrevMonth}>
          <img src={back} alt="back" />
        </button>
        <span className="text-2xl">
          {date.year}년 {date.month}월
        </span>
        <button onClick={handleNextMonth}>
          <img src={next} alt="next" />
        </button>
      </div>
      <div>
        {orders.length !== 0 ? (
          orders.map((order) => {
            const currentTime = new Date();
            const pickUpTime = new Date(order.pickUpTime);
            const timeDiff = Math.floor(
              (pickUpTime.getTime() - currentTime.getTime()) / (1000 * 60)
            );

            const statusText = timeDiff <= 0 ? "수령완료" : `${timeDiff}분전`;
            const additionalMenuText =
              order.menuCnt > 1 ? `외 ${order.menuCnt - 1} 종` : "";

            return (
              <div
                key={order.orderId}
                onClick={() => handleCardClick(order)}
                className={`flex justify-between border rounded-lg m-5 p-5 shadow-lg ${
                  statusText === "수령완료" ? "bg-[#EFF7FF]" : "bg-[#C5E2FF]"
                }`}
              >
                <div>
                  <div>
                    <h3 className="text-2xl">{order.cafeName}</h3>
                    <p className="text-xl">
                      {order.firstMenuName}{" "}
                      <span className="text-gray-400 text-base">
                        {additionalMenuText}
                      </span>
                    </p>
                  </div>
                  <div></div>
                </div>
                <div>
                  <p className="text-green-500">{statusText}</p>
                  <p className="text-xl">
                    {order.payAmount.toLocaleString()} 원
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full mt-20 text-3xl">
            <p>데이터가 없습니다.</p>
          </div>
        )}
        {showModal && (
          <DetailModal order={selectedOrder} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;
