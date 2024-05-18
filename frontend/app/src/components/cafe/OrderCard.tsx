import React from "react";
import { Order } from "../../api/orderAPI";

interface OrderCardProps {
  order: Order;
  onClick: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const currentTime = new Date();
  const pickUpTime = new Date(order.pickUpTime);
  const timeDiff = Math.floor(
    (pickUpTime.getTime() - currentTime.getTime()) / (1000 * 60)
  );

  const statusText = timeDiff <= 0 ? "수령완료" : `수령 ${timeDiff}분전`;
  const additionalMenuText =
    order.menuCnt > 1 ? `외 ${order.menuCnt - 1} 종` : "";

  return (
    <div
      key={order.orderId}
      onClick={() => onClick(order)}
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
      <div className="text-end mt-1">
        <p className="text-green-500 mb-2
        ">{statusText}</p>
        <p className="text-xl">{order.payAmount.toLocaleString()} 원</p>
      </div>
    </div>
  );
};

export default OrderCard;
