import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface CouponProps {
  allCouponCount: number;
  setCouponCount: (count: number) => void;
  isAddAvailable: boolean;
}

const Coupon: React.FC<CouponProps> = ({
  allCouponCount,
  setCouponCount,
  isAddAvailable,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCouponCount(count);
  }, [count]);

  // 쿠폰 수 감소 함수
  const handleDecrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  // 쿠폰 수 증가 함수
  const handleIncrement = () => {
    if (count < allCouponCount && isAddAvailable) {
      setCount((prev) => prev + 1);
    }
  };

  const totalPrice = 3000 * count;

  return (
    <div className="flex flex-col ml-4 space-y-1">
      <div className="text-left">
        <span className="text-2xl font-hyemin-bold">쿠폰사용</span>
        <span className="text-xs ml-2">
          사용가능{" "}
          <span className="text-orange-500 font-bold">{allCouponCount}</span>
        </span>
      </div>

      <div className="flex items-center justify-between mr-2">
        <div className="text-right text-base">
          쿠폰 -{totalPrice.toLocaleString()} 원
        </div>
        <div className="space-x-2">
          <RemoveCircleOutlineIcon
            sx={{
              fontSize: 25,
              color: `${count === 0 ? "lightGray" : "black"}`,
            }}
            onClick={handleDecrement}
          />
          <span className="text-base text-orange-500 font-bold">{count}</span>
          <AddCircleOutlineIcon
            sx={{
              fontSize: 25,
              color: `${
                count === allCouponCount || !isAddAvailable
                  ? "lightGray"
                  : "black"
              }`,
            }}
            onClick={handleIncrement}
          />
        </div>
      </div>
      <div className="text-xs text-right mr-2">
        (쿠폰 한 장은 3,000원 이에요.)
      </div>
    </div>
  );
};

export default Coupon;
