import React from "react";

interface PaymentCardProps {
  payment: {
    historyId: number;
    paymentDetail: string;
    totalPaymentAmount: number;
    useSubsidy: number;
    selfPayment: number;
  };
  onClick: (historyId: number) => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment, onClick }) => {
  return (
    <div
      className="bg-white rounded-md shadow-lg p-4 py-6 mb-4 w-90 border border-neutral-400"
      style={{ borderWidth: "2px" }}
      onClick={() => onClick(payment.historyId)}
    >
      <div className="flex justify-between">
        <p className="font-hyemin-bold text-xl">{payment.paymentDetail}</p>
        <p className="font-hyemin-bold text-xl">
          {payment.totalPaymentAmount} 원
        </p>
      </div>
      <div className="font-hyemin-regular text-md flex mt-2 gap-8 justify-between">
        <p style={{ color: "#179F0B" }}>지원금 {payment.useSubsidy} 원</p>
        <p style={{ color: "#346186" }}>본인부담금 {payment.selfPayment} 원</p>
      </div>
    </div>
  );
};

export default PaymentCard;
