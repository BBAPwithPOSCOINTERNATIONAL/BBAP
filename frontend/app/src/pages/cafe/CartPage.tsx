import React from "react";
import useCartStore from "../../store/cartStore";
import Button from "../../components/button"; // Button 컴포넌트는 필요에 따라 추가

// 장바구니 아이템에 대한 타입 정의
interface CartItem {
  name: string;
  price: number;
  count: number;
  options: string[];
}

function CartPage() {
  // useCartStore에서 cartList를 추출
  const { cartList, removeFromCart, totalPrice } = useCartStore((state) => ({
    cartList: state.cartList,
    removeFromCart: state.removeFromCart,
    totalPrice: state.totalPrice,
  }));

  // 장바구니 아이템을 삭제하는 함수
  const handleRemove = (index: number) => {
    removeFromCart(index);
  };

  return (
    <div>
      <h1>주문목록</h1>
      <ul>
        {cartList.map((item: CartItem, index: number) => (
          <li key={index}>
            {item.name} - {item.count}개 - 가격: {item.price.toLocaleString()}원
            {item.options.length > 0 && <p>옵션: {item.options.join(", ")}</p>}
            <Button
              onClick={() => handleRemove(index)}
              text="Remove"
              className=""
            />
          </li>
        ))}
      </ul>
      <p>{totalPrice}</p>
      {cartList.length === 0 && <p>장바구니가 비어 있습니다.</p>}
    </div>
  );
}

export default CartPage;
