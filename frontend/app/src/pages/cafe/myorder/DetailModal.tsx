import { Order } from "./MyOrderPage";

const DetailModal = ({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) => {
  if (!order) return null;

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/\./g, "-")
      .replace(/ /g, "")
      .replace(/:/g, ":");
    // .slice(0, -3); // 초 단위 제거
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5">
        <h2 className="text-2xl font-bold">{order.cafeName}</h2>
        <p>주문시간: {formatDate(order.pickUpTime)}</p>
        <p>{order.firstMenuName}</p>
        <p>총결제 금액: {order.payAmount.toLocaleString()} 원</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailModal;
