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
import listdeletebutton from "/assets/images/button/listdelete.png";
import { createOrder, getPayInfo } from "../../api/orderAPI";

function CartPage() {
  const navigate = useNavigate();
  const [couponCount, setCouponCount] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [isAddAvailable, setIsAddAvailable] = useState<boolean>(true);
  const [payInfo, setPayInfo] = useState({
    empId: 0,
    empName: "",
    stampCnt: 0,
    availableSubsidy: 0,
  });
  const cafeId = localStorage?.getItem("cafeId");

  // 모달
  const [showModal, setShowModal] = useState(false);

  // useCartStore에서 cartList를 추출
  const { cartList, removeFromCart, totalPrice, setCartCount } = useCartStore(
    (state) => ({
      cartList: state.cartList,
      removeFromCart: state.removeFromCart,
      totalPrice: state.totalPrice,
      setCartCount: state.setCartCount,
    })
  );
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function loadPayInfo(cafeId: string) {
      try {
        const response = await getPayInfo(cafeId);
        setPayInfo(response.data);
      } catch (error) {
        console.error("Failed to load payment info", error);
      }
    }

    if (cafeId) {
      loadPayInfo(cafeId);
    } else {
      console.error("Cafe ID is null.");
    }
  }, [cafeId]);

  useEffect(() => {
    const remaining =
      totalPrice - ((couponCount + 1) * 3000 + payInfo.availableSubsidy);
    setIsAddAvailable(remaining >= 0);
  }, [couponCount, totalPrice, payInfo.availableSubsidy]);

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

  const handleOrder = async () => {
    // 예상 수령시간 선택되지 않았을 경우
    if (selectedTime === 0) {
      alert("예상 수령시간을 선택해주세요.");
      return; // 함수 실행을 중단
    }

    const orderTime = new Date(); // 현재 시간 기준
    orderTime.setMinutes(orderTime.getMinutes() + selectedTime); // 선택된 시간을 추가
    orderTime.setHours(orderTime.getHours() + 9);
    const formattedOrderTime = orderTime.toISOString().replace(/\.\d{3}Z$/, "");

    // 주문 데이터 구성
    const orderData = {
      cafeId: localStorage.getItem("cafeId") ?? "",
      // usedSubsidy: payInfo.availableSubsidy,
      usedSubsidy: payInfo.availableSubsidy,
      pickUpTime: formattedOrderTime,
      menuList: cartList.map((item) => ({
        menuId: item.menuId,
        cnt: item.cnt,
        options: item.options.map((option) => ({
          optionName: option.optionName,
          type: option.type,
          required: option.required,
          choiceOptions: option.choice.map((choice) => ({
            choiceName: choice.choiceName,
            price: choice.price,
          })),
        })),
      })),
      cntCouponToUse: couponCount * 10,
    };

    try {
      const response = await createOrder(orderData);
      console.log("Order Response:", response);
      alert("주문이 완료되었습니다!");
      navigate("/after", { state: response }); // 성공적으로 주문 후 이동할 페이지
    } catch (error) {
      console.error("주문 실패:", error);
      alert("주문에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const support =
    totalPrice <= payInfo.availableSubsidy
      ? totalPrice
      : payInfo.availableSubsidy;

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
    <div className="mb-30">
      <div className="flex items-center justify-ceter flex m-1">
        <button onClick={handleOpenModal} className="text-4xl ml-2">
          <img src={deletebutton} />
        </button>
        <h1 className="text-center text-3xl font-hyemin-bold flex-1">
          {localStorage.getItem("cafeName")}
        </h1>
        <div></div>{" "}
      </div>
      <hr className="h-1 border-1 border-primary-color" />
      <hr className="h-1.5 -mt-1 bg-[#E3E9F6]" />

      {/* 주문목록 */}
      <h1 className="m-3 text-xl font-hyemin-bold">주문목록</h1>
      {/* <hr></hr> */}
      <ul className="list-none p-0 my-1">
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
              className="flex justify-between items-center mb-2.5 mx-4 border-b-2"
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
              <div onClick={() => handleRemove(index)}>
                <img src={listdeletebutton} alt="삭제버튼" className="w-5" />
              </div>
            </li>
          );
        })}
      </ul>

      {cartList.length === 0 && (
        <p className="text-center mb-1">장바구니가 비어 있습니다.</p>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleAddMoreItems}
          text="🛒 메뉴 더담기"
          className="m-2 items-center font-hyemin-bold mb-3"
        />
      </div>
      <hr className="h-3 bg-[#E3E9F6]" />
      <h1 className="m-3 text-xl font-hyemin-bold">
        예상 수령시간 <span style={{ color: "red" }}>*</span>
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

      <hr className="h-3 bg-[#E3E9F6]" />

      <Coupon
        allCouponCount={Math.floor(payInfo.stampCnt / 10)}
        setCouponCount={setCouponCount}
        isAddAvailable={isAddAvailable}
      />

      <hr className="h-3 bg-[#E3E9F6] my-4" />
      <div className="text-xl w-11/12 mx-auto space-y-2 font-hyemin-bold mb-24">
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
        <div className="flex justify-between font-hyemin-bold text-blue-700 mb-[160px]">
          <span>본인부담금</span>
          <span>
            {(totalPrice - (couponCount * 3000 + support)).toLocaleString()} 원
          </span>
        </div>

        <hr className="bg-[#D2DBF0] h-0.5 fixed bottom-16 " />
        <div className="text-sm text-center fixed bottom-16 left-0 w-full ">
          결제하기 버튼을 누르시면 사번으로 자동결제 됩니다.
        </div>
        <Button
          onClick={handleOrder}
          text="결제하기"
          className="w-full py-2 text-xl font-bold  bg-primary-color text-white h-14 fixed bottom-0 left-0"
        />
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <h2 className="text-2xl font-bold">주문 취소</h2>
        <p>정말로 장바구니를 비우고 주문을 </p>
        <p>취소 하시겠습니까 ?</p>
      </Modal>
    </div>
  );
}

export default CartPage;
