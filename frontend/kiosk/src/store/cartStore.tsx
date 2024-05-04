import { create } from "zustand";
import { CartItem } from "../types";

interface CartState {
	totalPrice: number;
	totalCount: number;
	cartList: CartItem[];
	addToCart: (menuInfo: CartItem) => void;
	removeFromCart: (index: number) => void;
	resetCart: () => void;
	setCartCount: (index: number, number: number) => void;
}

const useCartStore = create<CartState>((set) => ({
	totalPrice: 0,
	totalCount: 0,
	cartList: [],
	addToCart: (menuInfo: CartItem) =>
		set((state) => {
			// 이름과 옵션 내용이 같은 menu가 cart에 존재하는지 확인 => 있으면 cartList 추가가 아니라 count만 늘리는 방식으로 add
			const existingItemIndex = state.cartList.findIndex((item) => {
				const existingOptions = item.options.reduce((acc: string[], option) => {
					option.choice.forEach((choice) => {
						acc.push(choice.choiceName);
					});
					return acc;
				}, []);
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
					existingOptions.sort().join(", ") === inputOptions.sort().join(", ")
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
			const removedItemCount = newCartList[index].cnt;
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
			newCartList[index].cnt += number;
			return {
				cartList: newCartList,
				totalPrice: state.totalPrice + number * newCartList[index].price,
				totalCount: state.totalCount + number,
			};
		}),
	resetCart: () => set(() => ({ cartList: [], totalPrice: 0, totalCount: 0 })),
}));

export default useCartStore;
