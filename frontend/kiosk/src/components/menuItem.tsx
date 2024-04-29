import React from "react";
import { Menu } from "../types";
import useModalStore from "../store/modalStore";

interface MenuItemProps {
	menuItemData: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menuItemData }) => {
	const { openMenuModal } = useModalStore();
	const tempOption = menuItemData.options.find(
		(option) => option.option_name === "온도"
	);
	const tempChoices =
		tempOption && tempOption.choices.map((choice) => choice.choice_name);

	return (
		<div
			id="menu-item"
			className="relative rounded-3xl shadow-xl h-[400px] m-8 p-5 flex flex-col bg-stone-100"
			onClick={() => {
				openMenuModal(menuItemData);
			}}
		>
			{tempChoices && (
				<div className="flex justify-start space-x-3 text-2xs font-bold mb-2">
					{tempChoices.map((item, index) => {
						if (item === "HOT") {
							return (
								<p className="text-red-500" key={index}>
									{item} {tempChoices.length == 1 && "Only"}
								</p>
							);
						} else if (item === "ICE") {
							return (
								<p className="text-blue-500" key={index}>
									{item} {tempChoices.length == 1 && "Only"}
								</p>
							);
						}
					})}
				</div>
			)}
			<img
				src={menuItemData.imageUrl}
				alt={menuItemData.name}
				className="w-1/2 absolute top-24 left-20"
			/>
			<div id="menu-info" className="absolute w-full pr-10 bottom-4">
				<p className="text-xs break-keep">{menuItemData.name}</p>
				<p className="text-xs text-end font-bold">
					{menuItemData.price.toLocaleString()} 원
				</p>
			</div>
		</div>
	);
};

export default MenuItem;
