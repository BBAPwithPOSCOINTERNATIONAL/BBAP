import React from "react";

interface CafeCouponStatusProps {
  orderCount: number;
  couponCount: number;
  gaugeBars: JSX.Element[];
}

const CafeCoupon: React.FC<CafeCouponStatusProps> = ({
  orderCount,
  couponCount,
  gaugeBars,
}) => {
  return (
    <div className="mt-1 flex flex-col items-center">
      <p className="mt-1 font-hyemin-bold text-left">
        현재 주문량: {orderCount}개
      </p>
      <div className="bg-cafe-primary-color border p-3 rounded-lg mt-4 w-11/12 font-hyemin-bold">
        <div className="mt-1">
          <div className="flex justify-between">
            <p>보유 스탬프</p>
            <p>보유 쿠폰: {couponCount}장</p>
          </div>
          <div className="mt-2 text-xs">
            10개를 모으면 쿠폰으로 사용할 수 있어요
          </div>
          <div className="flex justify-center mt-4">
            <div className="h-4 w-full border rounded-lg flex">{gaugeBars}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCoupon;
