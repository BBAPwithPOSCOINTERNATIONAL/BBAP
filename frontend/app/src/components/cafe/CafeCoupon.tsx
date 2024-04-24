import React from "react";

interface CafeCouponStatusProps {
  orderCount: number;
  couponCount: number;
}

const CafeCoupon: React.FC<CafeCouponStatusProps> = ({
  orderCount,
  couponCount,
}) => {
  // 게이지 바 색상 설정을 위한 함수
  const getGaugeColor = (index: number): string => {
    if (index <= couponCount) {
      return "bg-primary-color";
    } else {
      return "bg-sky-200";
    }
  };

  // 게이지 바 생성을 위한 배열
  const gaugeBars = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className={`h-4 w-full ${getGaugeColor(index + 1)} rounded-sm`}
    ></div>
  ));

  return (
    <>
      <p className="mt-1 font-hyemin-bold ml-5 mt-1">
        현재 주문량: {orderCount}개
      </p>
      <div className="mt-1 flex flex-col items-center">
        <div className="bg-cafe-primary-color border p-3 rounded-lg mt-4 w-11/12 font-hyemin-bold">
          <div>
            <div className="flex justify-between">
              <p>보유 스탬프</p>
              <p>보유 쿠폰: {couponCount}장</p>
            </div>
            <div className="mt-2 text-xs">
              10개를 모으면 쿠폰으로 사용할 수 있어요
            </div>
            <div className="flex justify-center mt-4">
              <div className="h-4 w-full border rounded-lg flex">
                {gaugeBars}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CafeCoupon;
