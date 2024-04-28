import React from "react";
import useCartStore from "../store/cartStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { CartItem } from "../types";

interface CartItemProps {
	props: CartItem;
	index: number;
}

const CartItem: React.FC<CartItemProps> = ({ props, index }) => {
	const { setCartCount, removeFromCart } = useCartStore();
	const options = props.options.reduce((acc: string[], option) => {
		option.choices.forEach((choice) => {
			acc.push(choice.choice_name);
		});
		return acc;
	}, []);
	return (
		<div className="flex justify-between items-center">
			<div className="max-w-[260px]">
				<p className="text-xs font-bold my-0">{props.name}</p>
				<p className="text-2xs break-keep">{options.join(", ")}</p>
			</div>
			<div className="flex items-center justify-center text-xs font-bold space-x-5">
				{/* 수량 변경 */}
				<div className="flex space-x-2">
					<div
						className="flex items-center"
						onClick={() => {
							if (props.cnt > 1) {
								setCartCount(index, -1);
							}
						}}
					>
						<RemoveCircleOutlineIcon
							sx={{
								fontSize: 45,
								color: `${props.cnt === 1 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
					<p>{props.cnt}</p>
					<div
						className="flex items-center"
						onClick={() => {
							if (props.cnt < 30) {
								setCartCount(index, 1);
							}
						}}
					>
						<AddCircleOutlineIcon
							sx={{
								fontSize: 45,
								color: `${props.cnt === 30 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
				</div>
				{/* TODO: 10만보다 price가 커지면 두줄로 렌더링 */}
				<div className="text-xs">
					{(props.price * props.cnt).toLocaleString()} 원
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
