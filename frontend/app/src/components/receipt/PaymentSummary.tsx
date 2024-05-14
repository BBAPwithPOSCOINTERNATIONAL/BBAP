import React from "react";

interface PaymentSummaryProps {
  paymentDetail: string;
  totalPaymentAmount: number;
  useSubsidy: number;
  selfPayment: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  paymentDetail,
  totalPaymentAmount,
  useSubsidy,
  selfPayment,
}) => {
  return (
    <div className="m-5 mt-4 flex flex-col items-center">
      <p className="font-hyemin-bold text-3xl">{paymentDetail}</p>
      <div className="w-full">
        <div className="flex justify-between items-center text-2xl my-2">
          <span>총 금액</span>
          <span>{totalPaymentAmount.toLocaleString()}원</span>
        </div>
        <div className="font-hyemin-bold flex justify-between items-center text-2xl text-green-600 mb-2">
          <span>지원금</span>
          <span>{useSubsidy.toLocaleString()}원</span>
        </div>
        <div className="font-hyemin-bold flex justify-between items-center text-2xl text-blue-700 mb-2">
          <span>본인부담금</span>
          <span>{selfPayment.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
