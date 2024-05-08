import { useEffect, useState } from "react";
// import { getMyOrder } from "../../../api/Order";
import DetailModal from "./DetailModal";
import back from "/assets/images/button/back.png";
import next from "/assets/images/button/next.png";
import {
  getMyOrder,
  getMyorderDetail,
  Order,
  OrderDetailResponse,
} from "../../../api/orderAPI";

const MyOrderPage = () => {
  const [date, setDate] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderDetailResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  console.log(selectedOrder);
  const fetchOrders = async () => {
    try {
      const data = await getMyOrder(date.year, date.month);
      console.log(data.data.orderList);

      // 데이터를 받은 후에 정렬 로직을 수행
      const sortedOrders = data.data.orderList.sort((a, b) => {
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

      // 정렬된 데이터를 상태로 설정
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [date]);

  const handleCardClick = async (order: Order) => {
    try {
      const response = await getMyorderDetail(order.orderId);
      console.log("11", response.data);
      setSelectedOrderDetail(response);
      setSelectedOrder(order);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    }
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
          <DetailModal order={selectedOrderDetail} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default MyOrderPage;
