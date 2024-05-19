import { create } from "zustand";
import { Option } from "../api/cafeAPI";
import { persist } from "zustand/middleware";

export interface CartItem {
  menuId: string;
  name: string;
  price: number;
  cnt: number;
  options: Option[];
}

interface CartState {
  totalPrice: number;
  totalCount: number;
  cartList: CartItem[];
  addToCart: (menuInfo: CartItem) => void;
  removeFromCart: (index: number) => void;
  resetCart: () => void;
  setCartCount: (index: number, number: number) => void;
}
const useCartStore = create(
  persist<CartState>(
    (set) => ({
      totalPrice: 0,
      totalCount: 0,
      cartList: [],
      addToCart: (menuInfo: CartItem) =>
        set((state) => {
          const existingItemIndex = state.cartList.findIndex((item) => {
            const existingOptions = item.options.reduce(
              (acc: string[], option) => {
                option.choice.forEach((choice) => {
                  acc.push(choice.choiceName);
                });
                return acc;
              },
              []
            );
            const inputOptions = menuInfo.options.reduce(
              (acc: string[], option) => {
                option.choice.forEach((choice) => {
                  acc.push(choice.choiceName);
                });
                return acc;
              },
              []
            );

            return (
              item.name === menuInfo.name &&
              existingOptions.sort().join(", ") ===
                inputOptions.sort().join(", ")
            );
          });

          if (existingItemIndex !== -1) {
            const newCartList = [...state.cartList];
            newCartList[existingItemIndex].cnt += menuInfo.cnt;
            return {
              cartList: newCartList,
              totalPrice: state.totalPrice + menuInfo.cnt * menuInfo.price,
              totalCount: state.totalCount + menuInfo.cnt,
            };
          } else {
            return {
              cartList: [...state.cartList, menuInfo],
              totalPrice: state.totalPrice + menuInfo.cnt * menuInfo.price,
              totalCount: state.totalCount + menuInfo.cnt,
            };
          }
        }),
      removeFromCart: (index) =>
        set((state) => {
          const newCartList = [...state.cartList];
          const removedItemPrice =
            newCartList[index].price * newCartList[index].cnt;
          newCartList.splice(index, 1);
          return {
            cartList: newCartList,
            totalPrice: state.totalPrice - removedItemPrice,
            totalCount: state.totalCount - removedItemPrice,
          };
        }),
      setCartCount: (index, number) =>
        set((state) => {
          const newCartList = [...state.cartList];
          newCartList[index].cnt += number;
          return {
            cartList: newCartList,
            totalPrice: state.totalPrice + number * newCartList[index].price,
            totalCount: state.totalCount + number,
          };
        }),
      resetCart: () =>
        set(() => ({ cartList: [], totalPrice: 0, totalCount: 0 })),
    }),
    {
      name: "cart-store",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
