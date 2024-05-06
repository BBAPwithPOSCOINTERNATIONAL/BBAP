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
    return (
      date
        .toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        // .replace(/\./g, "-")
        .replace(/ /g, "")
        .replace(/:/g, ":")
    );
    // .slice(0, -3); // 초 단위 제거
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
      <div className="bg-slate-200 p-8 rounded-lg h-2/5 w-4/5 flex-col space-">
        <h2 className="text-3xl text-center">{order.data.cafeName}</h2>
        <p className="text-[12px] text-center mb-1">
          주문일 : {formatDate(order.data.orderTime)} / 주문시간 :
          {formatTime(order.data.orderTime)}
        </p>
        <hr className="h-1 bg-[#bbc6dd] mb-5 w-4/5 m-auto rounded-lg" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#afc2eb",
            height: "3rem",
            alignItems: "center",
            padding: "15px",
            borderRadius: "7px",
          }}
        >
          {order.data.menuList.map((item) => (
            <>
              <span>{item.menuName}</span>
              <span>{item.menuPrice.toLocaleString()} 원</span>
            </>
          ))}
          {/* <p className="text-sm">{order.data.payAmount.toLocaleString()}원</p> */}
        </div>

        <button
          onClick={onClose}
          className="block mx-auto mt-5 font-bold py-2 px-4 rounded mt-36"
        >
          <img src={closeimg} className="w-10 " />
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
