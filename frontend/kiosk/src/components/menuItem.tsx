import React from "react";
import { Menu } from "../types";

interface MenuItemProps {
	menuItemData: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItemData }) => {
	return (
		<div
			id="menu-item"
			className="relative rounded-3xl shadow-xl h-[430px] m-8 p-5 flex flex-col"
		>
			{menuItemData.temperature && (
				<div className="flex justify-start space-x-3 text-2xs font-bold mb-2">
					{menuItemData.temperature.map((item, index) => {
						if (item === "HOT") {
							return (
								<p className="text-red-500" key={index}>
									{item}
								</p>
							);
						} else if (item === "ICE") {
							return (
								<p className="text-blue-500" key={index}>
									{item}
								</p>
							);
						}
					})}
				</div>
			)}
			<img
				src={menuItemData.image}
				alt={menuItemData.name}
				className="w-2/3 absolute top-20 left-14"
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
