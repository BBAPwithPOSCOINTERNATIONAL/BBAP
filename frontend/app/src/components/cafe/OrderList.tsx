import React from "react";
import OrderCard from "./OrderCard";
import { Order, OrderDetailResponse } from "../../api/orderAPI";
import Nodata from "../../components/nodata";
import DetailModal from "./DetailModal";

interface OrderListProps {
  orders: Order[];
  onCardClick: (order: Order) => void;
  selectedOrderDetail: OrderDetailResponse | null;
  showModal: boolean;
  handleCloseModal: () => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onCardClick,
  selectedOrderDetail,
  showModal,
  handleCloseModal,
}) => {
  return (
    <div>
      {orders.length !== 0 ? (
        orders.map((order) => (
          <OrderCard key={order.orderId} order={order} onClick={onCardClick} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full mt-20 text-3xl">
          <Nodata />
        </div>
      )}
      {showModal && (
        <DetailModal order={selectedOrderDetail} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderList;
