import React, { useState, useEffect } from "react";
import CurrentTime from "../components/currentTime";
import cafeMenuData from "../mock/cafe-menu.json";
import { Menu } from "../types";
import MenuItem from "../components/menuItem";

interface MenuData {
	[key: string]: Menu[];
}

const MainPage: React.FC = () => {
	const tapItems: string[] = ["인기", "커피", "음료", "디저트"];
	const tapMapping: { [key: string]: string } = {
		인기: "popular",
		커피: "coffee",
		음료: "beverage",
		디저트: "dessert",
	};
	const [activeTapItem, setActiveTapItem] = useState<string>(tapItems[0]);
	const [activeMenu, setActiveMenu] = useState<Menu[]>();
	const [menuData, setMenuData] = useState<MenuData>();

	useEffect(() => {
		setMenuData(cafeMenuData);
	}, []);

	useEffect(() => {
		setActiveMenu(menuData ? menuData[tapMapping[activeTapItem]] : undefined);
	}, [menuData, activeTapItem]);

	const handleTapItemClick = (tap: string) => {
		setActiveTapItem(tap);
	};

	return (
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
									? "w-1/4 bg-active-color"
									: "w-1/5 bg-primary-color"
							} py-4`}
							key={index}
							onClick={() => handleTapItemClick(item)}
						>
							{item}
						</div>
					))}
				</div>
				<div
					id="menu-body"
					className="border border-2 border-primary-color rounded-b-3xl rounded-r-3xl h-[1600px] flex flex-col divide-y-2 divide-primary-color"
				>
					<div className="flex-grow overflow-y-auto grid grid-cols-3">
						{activeMenu &&
							activeMenu.map((item: Menu, index: number) => (
								<MenuItem menuItemData={item} key={index} />
							))}
						{/* menuItem 카드 렌더링 */}
					</div>
					<div className="h-[450px] flex divide-x-2 divide-primary-color">
						<div className="flex-grow">
							<p className="text-base font-bold">주문 목록</p>
							{/* store에 저장된 주문내역 렌더링 */}
						</div>
						<div className="w-[400px]">총 금액 + 결제버튼</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainPage;
