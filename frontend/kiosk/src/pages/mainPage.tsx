import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentTime from "../components/currentTime";
import cafeMenuData from "../mock/cafe-menu.json";
import { Menu } from "../types";
import MenuItem from "../components/menuItem";
import Button from "../components/button";
import MenuModal from "../components/menuModal";
import useModalStore from "../store/modalStore";
import useCartStore from "../store/cartStore";
import CartItem from "../components/cartItem";

interface MenuData {
	[key: string]: Menu[];
}

const MainPage: React.FC = () => {
	const tapItems: string[] = ["인기", "커피", "음료", "디저트"];
	const tapMapping: { [key: string]: string } = {
		인기: "menuListPopular",
		커피: "menuListCoffee",
		음료: "menuListBeverage",
		디저트: "menuListDessert",
	};
	const [activeTapItem, setActiveTapItem] = useState<string>(tapItems[0]);
	const [activeMenu, setActiveMenu] = useState<Menu[]>();
	const [menuData, setMenuData] = useState<MenuData>();
	const { isMenuModalOpen } = useModalStore();
	const { cartList, totalPrice, totalCount, resetCart } = useCartStore();
	const navigate = useNavigate();

	useEffect(() => {
		setMenuData(cafeMenuData);
	}, []);

	useEffect(() => {
		setActiveMenu(menuData ? menuData[tapMapping[activeTapItem]] : undefined);
	}, [menuData, activeTapItem]);

	const handleTapItemClick = (tap: string) => {
		setActiveTapItem(tap);
	};

	const goToEntry = () => {
		navigate("/");
		resetCart();
	};

	return (
		<>
			{isMenuModalOpen && <MenuModal />}
			<div className="w-full h-screen bg-white">
				<div id="header" className="flex justify-between p-8">
					<img
						src="/assets/images/포스코인터내셔널_로고.png"
						alt=""
						className="w-[300px]"
					/>
					<CurrentTime />
				</div>
				<div id="menus" className="m-10">
					<div
						id="menu-header"
						className="text-lg text-center text-white flex justify-start space-x-5"
					>
						{tapItems.map((item, index) => (
							<div
								className={`transition-all rounded-t-3xl ${
									activeTapItem === item
										? "w-1/4 bg-primary-color"
										: "w-1/5 bg-bg-color"
								} py-2`}
								key={index}
								onClick={() => handleTapItemClick(item)}
							>
								{item}
							</div>
						))}
					</div>
					<div
						id="menu-body"
						className="border border-2 border-primary-color rounded-b-3xl rounded-r-3xl h-[1650px] flex flex-col divide-y-2 divide-primary-color"
					>
						<div className="flex-grow overflow-y-auto my-1">
							<div className="grid grid-cols-3">
								{activeMenu &&
									activeMenu.map((item: Menu, index: number) => (
										<MenuItem menuItemData={item} key={index} />
									))}
							</div>
						</div>
						<div className="min-h-[450px] max-h-[450px] flex divide-x-2 divide-primary-color">
							<div className="flex-grow px-3 py-5">
								<div className="text-base font-bold bg-white">주문 목록</div>
								<div className="flex flex-col overflow-y-auto h-3/4 space-y-2">
									{/* store에 저장된 주문내역 렌더링 */}
									{cartList.map((item, index) => (
										<CartItem props={item} key={index} index={index} />
									))}
								</div>
							</div>
							<div className="w-[400px]">
								<div className="mx-10 my-3">
									<p className="flex justify-between text-2xs">
										<span>총 주문개수</span>
										<span className="font-bold">{totalCount} 개</span>
									</p>
									<p className="flex justify-between text-2xs">
										<span>총 결제금액</span>
										<span className="font-bold text-red-500">
											{totalPrice.toLocaleString()} 원
										</span>
									</p>
								</div>
								<div className="px-10 py-5 flex flex-col space-y-4">
									<Button
										onClick={() => {
											if (cartList.length > 0) {
												navigate("/game");
											}
										}}
										text={"내기하기"}
										className={`${
											cartList.length > 0
												? "bg-primary-color"
												: "bg-inactive-color"
										} text-sm text-white w-full py-3`}
									/>
									<Button
										onClick={() => {
											if (cartList.length > 0) {
												navigate("/payment");
											}
										}}
										text={"결제하기"}
										className={`${
											cartList.length > 0
												? "bg-active-color"
												: "bg-inactive-color"
										} text-sm text-white w-full py-3`}
									/>
									<Button
										onClick={() => goToEntry()}
										text={"처음으로"}
										className={"bg-bg-color text-sm text-white w-full py-3"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
