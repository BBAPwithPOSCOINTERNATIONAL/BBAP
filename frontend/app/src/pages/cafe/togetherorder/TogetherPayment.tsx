import { useEffect, useState } from "react";
import Button from "../../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import Coupon from "../../../components/cafe/Coupon";
import { OptionChoice } from "../../../api/cafeAPI";
import deletebutton from "/assets/images/button/delete.png";
import { useRoomStore } from "../../../store/roomStore.tsx";
import useWebSocket, {
  OrderItemPayload,
  OrderRequestDto,
} from "../../../api/useWebSocket.tsx";

const { VITE_WEBSOCKET_URL: websocketURL } = import.meta.env;
import { addMinutes } from "date-fns";
import { getPayInfo } from "../../../api/orderAPI.tsx";

function TogetherPayment() {
  const navigate = useNavigate();
  const [couponCount, setCouponCount] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [isAddAvailable, setIsAddAvailable] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [payInfo, setPayInfo] = useState({
    empId: 0,
    empName: "",
    stampCnt: 0,
    availableSubsidy: 0,
  });

  const { currentCafe, products } = useRoomStore();
  const { roomId } = useParams();
  const { room, order } = useWebSocket(websocketURL, roomId);

  useEffect(() => {
    if (products) {
      console.log(products);
      const sum = products.reduce((total, product) => {
        return product.price ? total + product.price : total;
      }, 0);
      setTotalPrice(sum);
    }
  }, [products]);

  useEffect(() => {
    async function loadPayInfo(cafeId: string) {
      try {
        const response = await getPayInfo(cafeId);
        setPayInfo(response.data);
      } catch (error) {
        console.error("Failed to load payment info", error);
      }
    }

    if (currentCafe?.id) {
      loadPayInfo(currentCafe.id);
    } else {
      console.error("Cafe ID is null.");
    }
  }, [currentCafe]);

  useEffect(() => {
    if (
      totalPrice - ((couponCount + 1) * 3000 + payInfo.availableSubsidy) <
      0
    ) {
      setIsAddAvailable(false);
    } else {
      setIsAddAvailable(true);
    }
  }, [couponCount, totalPrice, payInfo.availableSubsidy]);

  const support =
    totalPrice <= payInfo.availableSubsidy
      ? totalPrice
      : payInfo.availableSubsidy;

  const handleSelectTime = (time: number) => {
    // 선택된 시간에 따라 처리하는 로직 추가
    setSelectedTime(time);
  };

  const handleAddMoreItems = () => {
    navigate(-1);
  };

  const executeOrder = () => {
    // 예상 수령시간 선택되지 않았을 경우
    if (selectedTime === 0) {
      alert("예상 수령시간을 선택해주세요.");
      return; // 함수 실행을 중단
    }
    const menuList = products.map(
      (product): OrderItemPayload => ({
        menuId: product.menuId,
        cnt: product.cnt,
        options: product.options?.map((option) => ({
          ...option,
          choiceOptions: option.choiceOptions || [],
        })),
      })
    );

    const now = new Date();
    now.setHours(now.getHours() + 9);
    const pickUpTime = addMinutes(now, selectedTime);

    // usedSubsidy, cntCouponToUse 우선 0으로

    const orderDto: OrderRequestDto = {
      cafeId: currentCafe?.id || "",
      usedSubsidy: payInfo.availableSubsidy,
      pickUpTime,
      menuList,
      cntCouponToUse: couponCount,
    };

    order(orderDto);
  };

  useEffect(() => {
    if (room?.orderNumber != null) {
      navigate(`/together/${roomId}/ordered`);
    }
  }, [room]);

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between m-1">
        <button onClick={() => navigate(-1)} className="ml-2">
          <img src={deletebutton} className="w-6" />
        </button>
        <h1 className="text-center text-2xl font-hyemin-bold flex-1">
          {currentCafe?.name}
        </h1>
        <div></div>{" "}
        {/* 이 div는 h1을 중앙에 위치시키기 위한 더미 요소입니다. */}
      </div>
      <hr className="h-1 bg-gray-400 mb-2" />
      <h1 className="m-3 text-xl font-hyemin-bold">주문목록</h1>
      <ul className="list-none p-0 m-3">
        {products.map((item, index) => {
          const options = item.options
            ? item.options.reduce((acc: string[], option) => {
                if (option.choiceOptions) {
                  option.choiceOptions.forEach((choice: OptionChoice) => {
                    acc.push(choice.choiceName);
                  });
                }
                return acc;
              }, [])
            : [];
          return (
            <li
              key={index}
              className="flex justify-between items-center mb-2.5"
            >
              <div className="flex-1">
                <span className="text-base font-hyemin-bold">
                  {item.menuname}
                </span>
                {options.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    옵션: {options.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <span className="m-2 font-hyemin-bold">
                  {item.price.toLocaleString()}원
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {products.length === 0 && (
        <p className="text-center">장바구니가 비어 있습니다.</p>
      )}
      <div className="flex justify-center">
        <Button
          onClick={handleAddMoreItems}
          text="🛒 메뉴 더담기"
          className="m-2 items-center font-hyemin-bold"
        />
      </div>
      <hr className="h-2 bg-[#E3E9F6]" />
      <h1 className="m-3 text-xl font-hyemin-bold">
        예상 수령시간<span style={{ color: "red" }}>*</span>
      </h1>
      <div className="flex flex-col items-center mb-4 text-[15px]">
        <div className="flex justify-between w-full px-3">
          <button
            className={`my-2 px-3 py-2 font-xs border-2 rounded-lg ${
              selectedTime === 5
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(5)}
          >
            +5분
          </button>
          <button
            className={`my-2 px-2 py-2 font-xs border-2 rounded-lg ${
              selectedTime === 10
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(10)}
          >
            +10분
          </button>
          <button
            className={`my-2 px-2 py-2 font-sm border-2 rounded-lg ${
              selectedTime === 15
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(15)}
          >
            +15분
          </button>
          <button
            className={`my-2 px-2 py-2 font-sm border-2 rounded-lg ${
              selectedTime === 20
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(20)}
          >
            +20분
          </button>
          <button
            className={`my-2 px-2 py-2 font-sm border-2 rounded-lg ${
              selectedTime === 30
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(30)}
          >
            +30분
          </button>
        </div>
      </div>

      <hr className="h-2 bg-[#E3E9F6]" />

      <Coupon
        allCouponCount={Math.floor(payInfo.stampCnt / 10)}
        setCouponCount={setCouponCount}
        isAddAvailable={isAddAvailable}
      />

      <hr className="h-2 bg-[#E3E9F6] my-4" />
      <div className="text-xl w-11/12 mx-auto space-y-2 font-hyemin-bold">
        <div className="flex justify-between font-hyemin-bold">
          <span>총 주문금액</span>
          <span>{totalPrice.toLocaleString()} 원</span>
        </div>
        <div>
          <div className="flex justify-between font-hyemin-bold text-[#179F0B]">
            <span>할인금액</span>
            <span>-{(couponCount * 3000 + support).toLocaleString()} 원</span>
          </div>
          <div className="ms-10">
            <p className="text-base text-[#179F0B]">
              쿠폰할인 {(couponCount * 3000).toLocaleString()}
            </p>
            <p className="text-base text-[#179F0B]">
              회사지원금 {support.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex justify-between font-hyemin-bold text-blue-700">
          <span>본인부담금</span>
          <span>
            {(totalPrice - (couponCount * 3000 + support)).toLocaleString()} 원
          </span>
        </div>

        <hr className="bg-[#D2DBF0] h-0.5" />
        <div className="text-sm text-center ">
          결제하기 버튼을 누르시면 사번으로 자동결제 됩니다.
        </div>
        <Button
          onClick={executeOrder}
          text="결제하기"
          className="w-full text-2xl bg-primary-color text-white h-16 fixed bottom-0 left-0"
        />
      </div>
    </div>
  );
}

export default TogetherPayment;
