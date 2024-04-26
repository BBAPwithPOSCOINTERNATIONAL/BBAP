import { create } from "zustand";

interface MenuInfo {
  name: string;
  price: number;
  count: number;
  options: string[];
}
interface CartState {
  totalPrice: number;
  totalCount: number;
  cartList: MenuInfo[];
  addToCart: (menuInfo: MenuInfo) => void;
  removeFromCart: (index: number) => void;
  resetCart: () => void;
  setCartCount: (index: number, number: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  totalPrice: 0,
  totalCount: 0,
  cartList: [],
  addToCart: (menuInfo: MenuInfo) =>
    set((state) => {
      // 이름과 옵션 내용이 같은 menu가 cart에 존재하는지 확인 => 있으면 cartList 추가가 아니라 count만 늘리는 방식으로 add
      const existingItemIndex = state.cartList.findIndex(
        (item) =>
          item.name === menuInfo.name &&
          item.options.every((option) => menuInfo.options.includes(option))
      );

      if (existingItemIndex !== -1) {
        const newCartList = [...state.cartList];
        newCartList[existingItemIndex].count += menuInfo.count;
        return {
          cartList: newCartList,
          totalPrice: state.totalPrice + menuInfo.count * menuInfo.price,
          totalCount: state.totalCount + menuInfo.count,
        };
      } else {
        return {
          cartList: [...state.cartList, menuInfo],
          totalPrice: state.totalPrice + menuInfo.count * menuInfo.price,
          totalCount: state.totalCount + menuInfo.count,
        };
      }
    }),
  removeFromCart: (index) =>
    set((state) => {
      const newCartList = [...state.cartList];
      const removedItemPrice =
        newCartList[index].price * newCartList[index].count;
      const removedItemCount = newCartList[index].count;
      newCartList.splice(index, 1);
      return {
        cartList: newCartList,
        totalPrice: state.totalPrice - removedItemPrice,
        totalCount: state.totalCount - removedItemCount,
      };
    }),
  setCartCount: (index, number) =>
    set((state) => {
      const newCartList = [...state.cartList];
      newCartList[index].count += number;
      return {
        cartList: newCartList,
        totalPrice: state.totalPrice + number * newCartList[index].price,
        totalCount: state.totalCount + number,
      };
    }),
  resetCart: () => set(() => ({ cartList: [], totalPrice: 0, totalCount: 0 })),
}));

export default useCartStore;
