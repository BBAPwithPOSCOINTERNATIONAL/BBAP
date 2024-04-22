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
}

const useCartStore = create<CartState>((set) => ({
	totalPrice: 0,
	totalCount: 0,
	cartList: [],
	addToCart: (menuInfo: MenuInfo) =>
		set((state) => ({
			cartList: [...state.cartList, menuInfo],
			totalPrice: state.totalPrice + menuInfo.price * menuInfo.count,
			totalCount: state.totalCount + menuInfo.count,
		})),
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
}));

export default useCartStore;
