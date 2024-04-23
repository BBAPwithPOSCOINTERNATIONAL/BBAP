import React from "react";
import IconButton from "@mui/material/IconButton";

interface MenuInfo {
	name: string;
	price: number;
	count: number;
	options: string[];
}

interface CartItemProps {
	props: MenuInfo;
	index: number;
}

const CartItem: React.FC<CartItemProps> = ({ props, index }) => {
	return (
		<div className="flex">
			<div>
				<p className="text-xs font-bold">{props.name}</p>
				<p className="text-2xs">{props.options.join(", ")}</p>
			</div>
			<div className="text-xs">{props.price.toLocaleString()} 원</div>
			<div>{props.count}</div>
			<IconButton
				onClick={() => {
					console.log("삭제");
				}}
				aria-label="delete"
			>
				<DeleteIcon />
			</IconButton>
		</div>
	);
};

export default CartItem;
