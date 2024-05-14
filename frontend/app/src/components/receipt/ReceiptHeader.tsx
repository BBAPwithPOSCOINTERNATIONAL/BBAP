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
      <div className="font-hyemin-bold text-3xl mt-3 mb-5">
        {payStore || "식당 정보 없음"}
      </div>
      <div className="font-hyemin-regular text-lg m-5 mt-0">
        {formattedDate}
      </div>
    </div>
  );
};

export default ReceiptHeader;
