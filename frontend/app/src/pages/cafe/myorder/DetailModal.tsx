import { useEffect } from "react";
import { OrderDetailResponse } from "../../../api/orderAPI";
import closeimg from "/assets/images/button/close.png";

const DetailModal = ({
  order,
  onClose,
}: {
  order: OrderDetailResponse | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // 모달 바깥 영역을 클릭한 경우에 모달 닫히게
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".bg-slate-200")
      ) {
        onClose();
      }
    };

    if (order) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [order, onClose]);

  if (!order) return null;

  const formatDate = (isoString: Date) => {
    const date = new Date(isoString);
    let dateString = date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    // 마지막 점(.) 제거
    if (dateString.endsWith(".")) {
      dateString = dateString.slice(0, -1);
    }
    return dateString.replace(/ /g, "").replace(/:/g, ":");
  };

  const formatTime = (isoString: Date) => {
    const date = new Date(isoString);
    return date
      .toLocaleString("ko-KR", {
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
      <div className="bg-slate-200 p-4 rounded-lg h-2/5 w-4/5 flex flex-col justify-content: space-between">
        {/* 상단 */}
        <div>
          <h2 className="text-3xl text-center">{order.data.cafeName}</h2>
          <p className="text-[12px] text-center my-1">
            주문일: {formatDate(order.data.orderTime)} / 주문시간:{" "}
            {formatTime(order.data.orderTime)}
          </p>
          <hr className="h-1 bg-[#bbc6dd] mb-5 w-11/12 m-auto rounded-lg" />
        </div>
        {/* 중간 */}
        <div className="flex flex-col grow gap-2">
          {order.data.menuList.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#afc2eb] p-2 rounded-lg flex justify-between items-center"
            >
              <span className="font-semibold">
                {item.menuName} x {item.menuCnt}
              </span>
              <span>{item.menuPrice.toLocaleString()} 원</span>
            </div>
          ))}
        </div>
        {/* 하단 */}
        <div>
          <button
            onClick={onClose}
            className="block mx-auto font-bold py-2 px-4 rounded"
          >
            <img src={closeimg} className="w-10" alt="close" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
