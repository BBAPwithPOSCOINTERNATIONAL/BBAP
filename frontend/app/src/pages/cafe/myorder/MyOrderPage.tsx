import { useEffect, useState } from "react";
import MonthNavigation from "../../../components/cafe/MonthNavigation";
import OrderList from "../../../components/cafe/OrderList";
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
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderDetailResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrder(date.year, date.month);
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
      setSelectedOrderDetail(response);
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
    const currentMonth = today.getMonth() + 1;

    setDate((prev) => {
      if (
        prev.year > currentYear ||
        (prev.year === currentYear && prev.month >= currentMonth)
      ) {
        return prev;
      } else if (prev.month === 12) {
        return { year: prev.year + 1, month: 1 };
      } else {
        return { ...prev, month: prev.month + 1 };
      }
    });
  };

  return (
    <div className="font-hyemin-bold">
      <MonthNavigation
        date={date}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <OrderList
        orders={orders}
        onCardClick={handleCardClick}
        selectedOrderDetail={selectedOrderDetail}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default MyOrderPage;
