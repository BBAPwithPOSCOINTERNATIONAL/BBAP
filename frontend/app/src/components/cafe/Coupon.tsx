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

  return (
    <>
      <p className="m-2 text-base items-center space-x-1">
        <span className="m-2 text-2xl font-hyemin-bold">쿠폰사용</span>
        <span className="text-2xs">
          (사용가능{" "}
          <span className="text-orange-500 font-bold">{allCouponCount}</span>)
        </span>
      </p>

      <div className="flex flex-col items-end space-y-3">
        {/* 쿠폰 수량 변경 */}
        <div id="change-coupon-count" className="flex space-x-2 mx-5">
          <div
            className="flex items-center"
            onClick={() => {
              if (count > 0) {
                setCount((prev) => prev - 1);
              }
            }}
          >
            <RemoveCircleOutlineIcon
              sx={{
                fontSize: 25,
                color: `${count === 0 ? "lightGray" : "black"}`,
              }}
            />
          </div>
          <p className="text-base text-orange-500 font-bold">{count}</p>
          <div
            className="flex items-center"
            onClick={() => {
              if (count <= allCouponCount && isAddAvailable) {
                setCount((prev) => prev + 1);
              }
            }}
          >
            <AddCircleOutlineIcon
              sx={{
                fontSize: 25,
                color: `${
                  count === allCouponCount || !isAddAvailable
                    ? "lightGray"
                    : "black"
                }`,
              }}
            />
          </div>
        </div>
        <div className="text-xs">쿠폰 한 장은 3,000원 이에요.</div>
      </div>
    </>
  );
};

export default Coupon;
