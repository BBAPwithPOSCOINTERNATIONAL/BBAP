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

const CartItemDiv: React.FC<CartItemProps> = ({ props, index }) => {
	const { setCartCount, removeFromCart } = useCartStore();
	const options = props.options.reduce((acc: string[], option) => {
		option.choice.forEach((choice) => {
			acc.push(choice.choiceName);
		});
		return acc;
	}, []);
	return (
		<div className="flex justify-between items-center  ">
			<div className="max-w-[250px]">
				<p className="text-xs font-bold my-0 break-keep">{props.name}</p>
				<p className="text-2xs break-keep">{options.join(", ")}</p>
			</div>
			<div className="flex text-xs font-bold ">
				{/* 수량 변경 */}
				<div className="flex w-[90px] " style={{paddingLeft: '16px'}}>
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
								fontSize: 25,
								color: `${props.cnt === 1 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
					<div style={{width:'30px', alignSelf: 'center'}}>
						<p style={{width:'30px', textAlign: 'center'}}> {props.cnt}</p>
					</div>
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
								fontSize: 25,
								color: `${props.cnt === 30 ? "lightGray" : "black"}`,
							}}
						/>
					</div>
				</div>

				<div className={`${props.cnt < 15 ? "text-xs" : "text-xs"}`} style={{width: '120px', textAlign: 'end', marginRight : '10px'}}>
					{(props.price * props.cnt).toLocaleString()} 원
				</div>
				{/* 삭제 버튼 */}
				<div
					className="flex items-center"
					onClick={() => removeFromCart(index)}
				>
					<CancelIcon
						sx={{
							fontSize: 35,
							color: "red",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default CartItemDiv;
