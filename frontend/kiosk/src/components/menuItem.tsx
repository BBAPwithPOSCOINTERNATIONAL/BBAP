import React from "react";
import { Menu } from "../types";
import useModalStore from "../store/modalStore";

interface MenuItemProps {
	menuItemData: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItemData }) => {
	const { openMenuModal } = useModalStore();
	const tempLen: number = menuItemData.temperature
		? menuItemData.temperature.length
		: 0;
	return (
		<div
			id="menu-item"
			className="relative rounded-3xl shadow-xl h-[400px] m-8 p-5 flex flex-col bg-stone-100"
			onClick={() => {
				console.log("클릭");
				openMenuModal(menuItemData);
			}}
		>
			{menuItemData.temperature && (
				<div className="flex justify-start space-x-3 text-2xs font-bold mb-2">
					{menuItemData.temperature.map((item, index) => {
						if (item === "HOT") {
							return (
								<p className="text-red-500" key={index}>
									{item} {tempLen == 1 && "Only"}
								</p>
							);
						} else if (item === "ICE") {
							return (
								<p className="text-blue-500" key={index}>
									{item} {tempLen == 1 && "Only"}
								</p>
							);
						}
					})}
				</div>
			)}
			<img
				src={menuItemData.image}
				alt={menuItemData.name}
				className="w-1/2 absolute top-24 left-20"
			/>
			<div id="menu-info" className="absolute w-full pr-10 bottom-4">
				<p className="text-xs break-keep">{menuItemData.name}</p>
				<p className="text-2xs text-end font-bold">
					{menuItemData.price.toLocaleString()} 원
				</p>
			</div>
		</div>
	);
};

export default MenuItem;
