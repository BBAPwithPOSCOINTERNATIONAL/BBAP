import React from "react";
import { format } from "date-fns";

interface ReceiptHeaderProps {
  payStore: string;
  paymentDate: string;
}

const ReceiptHeader: React.FC<ReceiptHeaderProps> = ({
  payStore,
  paymentDate,
}) => {
  const formattedDate = paymentDate
    ? format(new Date(paymentDate), "yyyy년 MM월 dd일 HH:mm:ss")
    : "";

  return (
    <div>
      <div
        className="font-hyemin-bold text-2xl mb-4 mt-1"
        style={{
          // width: "100vw",
          paddingTop: "0.6rem",
          paddingBottom: "0.3rem",
        }}
      >
        🍰 {payStore || "식당 정보 없음"} 🍰
      </div>
      <div className="font-hyemin-regular text-lg m-5 mt-0">
        {formattedDate}
      </div>
    </div>
  );
};

export default ReceiptHeader;
