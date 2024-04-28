import React from "react";
import useCartStore from "../store/cartStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

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
	const { setCartCount, removeFromCart } = useCartStore();
	return (
		<div className="flex justify-between items-center">
			<div>
				<p className="text-xs font-bold my-0">{props.name}</p>
				<p className="text-2xs">{props.options.join(", ")}</p>
			</div>
			<div className="flex items-center justify-center text-xs font-bold space-x-5">
				{/* 수량 변경 */}
				<div className="flex space-x-2">
					<div
						className="flex items-center"
						onClick={() => {
							if (props.count > 1) {
								setCartCount(index, -1);
							}
						}}
					>
						<RemoveCircleOutlineIcon
							sx={{
								fontSize: 45,
								color: `${props.count === 1 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
					<p>{props.count}</p>
					<div
						className="flex items-center"
						onClick={() => {
							if (props.count < 30) {
								setCartCount(index, 1);
							}
						}}
					>
						<AddCircleOutlineIcon
							sx={{
								fontSize: 45,
								color: `${props.count === 30 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
				</div>
				<div className="text-xs">
					{(props.price * props.count).toLocaleString()} 원
				</div>
				{/* 삭제 버튼 */}
				<div
					className="flex items-center"
					onClick={() => removeFromCart(index)}
				>
					<CancelIcon
						sx={{
							fontSize: 50,
							color: "red",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
