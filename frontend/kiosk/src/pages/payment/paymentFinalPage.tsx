import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Header from "../../components/header";
import useModalStore from "../../store/modalStore";
import useCartStore from "../../store/cartStore";
import Button from "../../components/button";
import Coupon from "../../components/coupon";
import ConfirmModal from "../../components/confirmModal";
import { CartItem } from "../../types";
import { paymentReq } from "../../api/paymentApi";

interface Option {
  optionName: string;
  type: string;
  required: boolean;
  choiceOptions: {
    choiceName: string;
    price: number;
  }[];
}

interface Menu {
  menuId: string;
  cnt: number;
  options: Option[];
}

const OrderItem: React.FC<{ data: CartItem }> = ({ data }) => {
  const options = data.options.reduce((acc: string[], option) => {
    option.choice.forEach((choice) => {
      acc.push(choice.choiceName);
    });
    return acc;
  }, []);
  return (
    <tr className="border-b">
      <td className="px-4 py-2">
        <p>{data.name}</p>
        <p className="text-2xs">{options.join(", ")}</p>
      </td>
      <td className="px-4 py-2 text-center">{data.cnt}</td>
      <td className="px-4 py-2 text-center">
        {(data.price * data.cnt).toLocaleString()}
      </td>
    </tr>
  );
};

const PaymentFinalPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [couponCount, setCouponCount] = useState<number>(0);
  const [isAddAvailable, setIsAddAvailable] = useState<boolean>(true);
  const { openConfirmModal, isConfirmModalOpen } = useModalStore();
  const { cartList, totalPrice, resetCart } = useCartStore();

  const ordererInfo = location.state.data;

  useEffect(() => {
    if (
      totalPrice - ((couponCount + 1) * 3000 + ordererInfo.availableSubsidy) <
      0
    ) {
      setIsAddAvailable(false);
    } else {
      setIsAddAvailable(true);
    }
  }, [couponCount]);

  const handleModalClose = () => {
    navigate("/");
    resetCart();
  };

  // 사원 정보 -> 이름, 남은 지원금, 해당 카페의 쿠폰 수 (이전 페이지에서 api 요청의 결과로 받음)
  // const ordererInfo = { ...location.state };

  // 가능한 지원금 금액과 결제 금액을 비교함
  // 1. 지원금 <= 결제 금액: 지원금 전체를 사용
  // 2. 지원금 > 결제 금액: 결제 금액 만큼만 지원금으로 사용
  const support =
    totalPrice <= ordererInfo.availableSubsidy
      ? totalPrice
      : ordererInfo.availableSubsidy;

  const handlePayment = async () => {
    const menuList = cartList.reduce((acc: Menu[], item) => {
      const tmp = {
        menuId: item.menuId,
        cnt: item.cnt,
        options: [] as Option[],
      };
      item.options.forEach((option) => {
        const choiceOptions = option.choice.map((choice) => {
          return {
            choiceName: choice.choiceName,
            price: choice.price,
          };
        });
        tmp.options.push({
          optionName: option.optionName,
          type: option.type,
          required: option.required,
          choiceOptions,
        });
      });
      acc.push(tmp);
      return acc;
    }, []);

    const payload = {
      empId: ordererInfo.empId,
      usedSubsidy: ordererInfo.availableSubsidy,
      menuList,
    };

    try {
      const response = await paymentReq(payload);
      const content = (
        <div className="w-[550px] h-[500px] px-12 py-16 flex flex-col justify-between">
          <p className="text-lg font-bold text-primary-color">
            주문이 완료되었습니다.
          </p>
          <p className="flex items-center justify-between mx-16">
            <span className="text-lg font-bold text-primary-color">
              주문번호
            </span>{" "}
            <span className="text-2xl font-bold">{response.data.orderNum}</span>
          </p>
          <Button
            text="처음으로"
            className="bg-bg-color w-[400px] text-lg text-white px-10 py-4 mx-auto"
            onClick={() => {
              handleModalClose();
            }}
          />
        </div>
      );

      openConfirmModal(content);
    } catch (error) {
      console.error("결제 오류:", error);
    }
  };

  //   const handlePayment = async () => {
  //     const menuList = cartList.reduce((acc: Menu[], item) => {
  //       const tmp = {
  //         menuId: item.menuId,
  //         cnt: item.cnt,
  //         options: [] as Option[],
  //       };
  //       const options: Option[] = item.options.map((option) => {
  //         const choiceOptions = option.choice.map((choice) => {
  //           return {
  //             choiceName: choice.choiceName,
  //             price: choice.price,
  //           };
  //         });
  //         return {
  //           optionName: option.optionName,
  //           type: option.type,
  //           required: option.required,
  //           choiceOptions: choiceOptions,
  //         };
  //       });
  //       tmp["options"] = options;
  //       acc.push(tmp);
  //       return acc;
  //     }, []);
  //     // body에 담아서 보내야하는 데이터
  //     const payload = {
  //       empId: ordererInfo.empId,
  //       usedSubsidy: support,
  //       menuList,
  //     };

  //     // TODO 서버로 결제요청 보냄
  //     try {
  //       const response = await paymentReq(payload);
  //       // const response = { data: { orderNum: 120 } };
  //       console.log("결제");
  //       const content = (
  //         <div className="w-[550px] h-[500px] px-12 py-16 flex flex-col justify-between">
  //           <p className="text-lg font-bold text-primary-color">
  //             주문이 완료되었습니다.
  //           </p>
  //           <p className="flex items-center justify-between mx-16">
  //             <span className="text-lg font-bold text-primary-color">
  //               주문번호
  //             </span>{" "}
  //             <span className="text-2xl font-bold">{response.data.orderNum}</span>
  //           </p>
  //           <Button
  //             text="처음으로"
  //             className="bg-bg-color w-[400px] text-lg text-white px-10 py-4 mx-auto"
  //             onClick={() => {
  //               handleModalClose();
  //             }}
  //           />
  //         </div>
  //       );

  //       openConfirmModal(content);
  //     } catch (error) {
  //       console.error("결제 오류:", error);
  //     }
  //   };

  return (
    <div>
      <Header text="결제하기" className="" />
      <div id="body">
        <p className="text-lg mx-40 my-8">
          <span className="font-bold">{ordererInfo.empName}</span> 님, 주문하신
          내역입니다.
        </p>
        <div
          id="order-list"
          className="mx-auto w-3/4 h-[300px] overflow-y-auto text-sm"
        >
          <table className="table-auto w-full">
            <thead className="border-b bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 w-2/3 text-start">메뉴</th>
                <th className="px-4 py-2 text-center">수량</th>
                <th className="px-4 py-2 text-center">가격</th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {cartList.map((item, index) => (
                <OrderItem key={index} data={item} />
              ))}
            </tbody>
          </table>
        </div>
        <Coupon
          allCouponCount={ordererInfo.stampCnt}
          setCouponCount={setCouponCount}
          isAddAvailable={isAddAvailable}
        />
      </div>
      <div className="text-lg w-2/3 mx-auto space-y-3">
        <div className="flex justify-between font-bold">
          <span>총 주문금액</span>
          <span>{totalPrice.toLocaleString()} 원</span>
        </div>
        <div>
          <div className="flex justify-between font-bold">
            <span>할인금액</span>
            <span className="text-active-color">
              -{(couponCount * 3000 + support).toLocaleString()} 원
            </span>
          </div>
          <div className="ms-10">
            <p className="text-sm">
              쿠폰할인 : {(couponCount * 3000).toLocaleString()} 원
            </p>
            <p className="text-sm">
              회사지원금 : {support.toLocaleString()} 원
            </p>
          </div>
        </div>
        <div className="flex justify-between font-bold">
          <span>본인부담금</span>
          <span className="text-blue-700">
            {(totalPrice - (couponCount * 3000 + support)).toLocaleString()} 원
          </span>
        </div>
      </div>

      <div className="w-full absolute bottom-[70px] flex justify-center space-x-16">
        <Button
          className="bg-bg-color text-white text-xl w-1/4 py-4"
          text="취소"
          onClick={() => {
            navigate("/payment");
          }}
        />
        <Button
          className="bg-active-color text-white text-xl w-1/4 py-4"
          text="결제"
          onClick={() => {
            handlePayment();
          }}
        />
      </div>
      {isConfirmModalOpen && <ConfirmModal handleClose={handleModalClose} />}
    </div>
  );
};

export default PaymentFinalPage;
