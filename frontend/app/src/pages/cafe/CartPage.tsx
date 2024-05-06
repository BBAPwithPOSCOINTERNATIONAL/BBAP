import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
import Button from "../../components/button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import Coupon from "../../components/cafe/Coupon";
import Modal from "../../components/cafe/Modal";
import { OptionChoice } from "../../api/cafeAPI";
import deletebutton from "/assets/images/button/delete.png";

function CartPage() {
  const navigate = useNavigate();
  const [couponCount, setCouponCount] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [isAddAvailable, setIsAddAvailable] = useState<boolean>(true);

  // 모달
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // useCartStore에서 cartList를 추출
  const { cartList, removeFromCart, totalPrice, setCartCount } = useCartStore(
    (state) => ({
      cartList: state.cartList,
      removeFromCart: state.removeFromCart,
      totalPrice: state.totalPrice,
      setCartCount: state.setCartCount,
    })
  );

  const ordererInfo = {
    name: "젠킨스",
    remainMoney: 3000,
    coupon: 10,
  };

  useEffect(() => {
    if (totalPrice - ((couponCount + 1) * 3000 + ordererInfo.remainMoney) < 0) {
      setIsAddAvailable(false);
    } else {
      setIsAddAvailable(true);
    }
  }, [couponCount, totalPrice, ordererInfo.remainMoney]);

  // 장바구니 아이템을 삭제하는 함수
  const handleRemove = (index: number) => {
    removeFromCart(index);
  };

  const handleDecrease = (index: number) => {
    const item = cartList[index];
    if (item.cnt > 1) {
      setCartCount(index, -1);
    }
  };

  const support =
    totalPrice <= ordererInfo.remainMoney
      ? totalPrice
      : ordererInfo.remainMoney;

  const handleIncrease = (index: number) => {
    const item = cartList[index];
    if (item.cnt < 99) {
      setCartCount(index, 1);
    }
  };

  const handleSelectTime = (time: number) => {
    // 선택된 시간에 따라 처리하는 로직 추가
    setSelectedTime(time);
  };

  const handleAddMoreItems = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center justify-between m-1">
        <button onClick={handleOpenModal} className="text-4xl ml-2">
          <img src={deletebutton} />
        </button>
        <h1 className="text-center text-3xl font-hyemin-bold flex-1">
          카페이름 나올 예정
        </h1>
        <div></div>{" "}
        {/* 이 div는 h1을 중앙에 위치시키기 위한 더미 요소입니다. */}
      </div>
      <hr className="h-1 border-1 bg-black mb-2" />
      <h1 className="m-3 text-2xl font-hyemin-bold">주문목록</h1>
      <ul className="list-none p-0 m-3">
        {cartList.map((item, index) => {
          const options = item.options.reduce((acc: string[], option) => {
            option.choice.forEach((choice: OptionChoice) => {
              acc.push(choice.choiceName);
            });
            return acc;
          }, []);
          return (
            <li
              key={index}
              className="flex justify-between items-center mb-2.5"
            >
              <div className="flex-1">
                <span className="text-base font-hyemin-bold">{item.name}</span>
                {options.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    옵션: {options.join(", ")}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <div className="my-3 flex items-center justify-center text-base font-hyemin-bold space-x-1">
                  <div onClick={() => handleDecrease(index)}>
                    <RemoveCircleOutlineIcon
                      sx={{
                        fontSize: 25,
                        color: `${item.cnt === 1 ? "lightGray" : "black"}`,
                      }}
                    />
                  </div>
                  <p>{item.cnt}</p>
                  <div onClick={() => handleIncrease(index)}>
                    <AddCircleOutlineIcon
                      sx={{
                        fontSize: 25,
                        color: `${item.cnt === 99 ? "lightGray" : "black"}`,
                      }}
                    />
                  </div>
                </div>
                <span className="m-2 font-hyemin-bold">
                  {item.price.toLocaleString()}원
                </span>
              </div>
              <Button
                onClick={() => handleRemove(index)}
                text=" "
                className="mr-2"
              />
            </li>
          );
        })}
      </ul>
      {cartList.length === 0 && <p className="text-center">장바구니가 비어 있습니다.</p>}
      <div className="flex justify-center">
        <Button
          onClick={handleAddMoreItems}
          text="🛒 메뉴 더담기"
          className="m-2 items-center font-hyemin-bold"
        />
      </div>
      <hr className="h-2 bg-[#E3E9F6]" />
      <h1 className="m-3 text-2xl font-hyemin-bold">예상 수령시간</h1>
      <div className="flex flex-col items-center">
        <div className="flex justify-center">
          <button
            className={`m-2 px-2 py-2 border-2 rounded-lg ${
              selectedTime === 0
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(0)}
          >
            지금
          </button>
          <button
            className={`m-2 px-2 py-2 border-2 rounded-lg ${
              selectedTime === 5
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(5)}
          >
            +5분
          </button>
          <button
            className={`m-2 px-2 py-2 border-2 rounded-lg ${
              selectedTime === 10
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(10)}
          >
            +10분
          </button>
          <button
            className={`m-2 px-2 py-2 border-2 rounded-lg ${
              selectedTime === 20
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => handleSelectTime(20)}
          >
            +20분
          </button>
          <button
            className={`m-2 px-2 py-2 border-2 rounded-lg ${
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
        allCouponCount={ordererInfo.coupon}
        setCouponCount={setCouponCount}
        isAddAvailable={isAddAvailable}
      />

      <hr className="h-2 bg-[#E3E9F6] my-4" />
      <div className="text-2xl w-11/12 mx-auto space-y-2 font-hyemin-bold">
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
          onClick={() => navigate("/after")}
          text="결제하기"
          className="w-full text-3xl bg-primary-color text-white h-16 fixed bottom-2"
        />
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold">주문 취소</h2>
        <p>정말로 장바구니를 비우고 주문을 </p>
        <p>취소 하시겠습니까 ?</p>
      </Modal>
    </div>
  );
}

export default CartPage;
