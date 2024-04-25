import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import useModalStore from "../store/modalStore";
import useCartStore from "../store/cartStore";
import Button from "../components/button";
import Coupon from "../components/coupon";

interface MenuInfo {
	name: string;
	price: number;
	count: number;
	options: string[];
}

const OrderItem: React.FC<{ data: MenuInfo }> = ({ data }) => {
	return (
		<tr className="border-b">
			<td className="px-4 py-2">
				<p>{data.name}</p>
				<p className="text-2xs">{data.options.join(", ")}</p>
			</td>
			<td className="px-4 py-2 text-center">{data.count}</td>
			<td className="px-4 py-2 text-center">
				{(data.price * data.count).toLocaleString()}
			</td>
		</tr>
	);
};

const PurchaseFinalPage: React.FC = () => {
	const navigate = useNavigate();
	const [couponCount, setCouponCount] = useState<number>(0);
	const [isAddAvailable, setIsAddAvailable] = useState<boolean>(true);

	useEffect(() => {
		if (
			totalPrice - ((couponCount + 1) * 3000 + ordererInfo.remainMoney) <=
			0
		) {
			setIsAddAvailable(false);
		} else {
			setIsAddAvailable(true);
		}
	}, [couponCount]);

	// 사원 정보 -> 이름, 남은 지원금, 해당 카페의 쿠폰 수
	const ordererInfo = {
		name: "젠킨스",
		remainMoney: 3000,
		coupon: 10,
	};

	// 주문 목록
	// const { cartList, totalPrice } = useCartStore();
	const cartList = [
		{
			name: "아메리카노",
			price: 3500,
			count: 2,
			options: ["medium", "1샷 추가", "헤이즐넛시럽 추가"],
		},
		{
			name: "딸기마카롱",
			price: 1500,
			count: 2,
			options: [],
		},
		{
			name: "오렌지에이드",
			price: 4500,
			count: 1,
			options: ["large"],
		},
		{
			name: "더치커피",
			price: 3500,
			count: 1,
			options: ["small"],
		},
		{
			name: "더치커피",
			price: 3500,
			count: 1,
			options: ["small"],
		},
		{
			name: "더치커피",
			price: 3500,
			count: 1,
			options: ["small"],
		},
		{
			name: "더치커피",
			price: 3500,
			count: 1,
			options: ["small"],
		},
	];

	const totalPrice = 15000;

	const handlePurchase = () => {
		// TODO 서버로 결제요청 보냄
		console.log("결제");
	};
	return (
		<div>
			<Header text="결제하기" className="" />
			<div id="body">
				<p className="text-lg mx-40 my-16">
					<span className="font-bold">{ordererInfo.name}</span> 님, 주문하신
					내역입니다.
				</p>
				<div
					id="order-list"
					className="mx-auto w-3/4 h-[480px] overflow-y-auto text-sm"
				>
					<table className="table-auto w-full">
						<thead className="border-b bg-gray-100 sticky top-0">
							<th className="px-4 py-2 text-start">메뉴</th>
							<th className="px-4 py-2 text-center">수량</th>
							<th className="px-4 py-2 text-center">가격</th>
						</thead>

						<tbody className="text-xs">
							{cartList.map((item, index) => (
								<OrderItem key={index} data={item} />
							))}
						</tbody>
					</table>
				</div>
				<Coupon
					allCouponCount={ordererInfo.coupon}
					setCouponCount={setCouponCount}
					isAddAvailable={isAddAvailable}
				/>
			</div>
			<div className="text-lg w-2/3 mx-auto space-y-5">
				<div className="flex justify-between">
					<span className="font-bold">총 주문금액</span>
					<span>{totalPrice.toLocaleString()} 원</span>
				</div>
				<div>
					<div className="flex justify-between text-active-color">
						<span className="font-bold">할인금액</span>
						<span>
							-{(couponCount * 3000 + ordererInfo.remainMoney).toLocaleString()}{" "}
							원
						</span>
					</div>
					<div className="ms-10">
						<p className="text-sm text-active-color">
							쿠폰할인 : {(couponCount * 3000).toLocaleString()} 원
						</p>
						<p className="text-sm text-active-color">
							회사지원금 : {ordererInfo.remainMoney.toLocaleString()} 원
						</p>
					</div>
				</div>
				<div className="flex justify-between text-blue-700">
					<span className="font-bold">본인부담금</span>
					<span>
						{(
							totalPrice -
							(couponCount * 3000 + ordererInfo.remainMoney)
						).toLocaleString()}{" "}
						원
					</span>
				</div>
			</div>

			<div className="w-full absolute bottom-[150px] flex flex-col space-y-10 items-center">
				<Button
					className="bg-active-color text-white text-xl w-1/3 py-5"
					text="결제하기"
					onClick={() => {
						handlePurchase();
					}}
				/>
				<Button
					className="bg-bg-color text-white text-xl w-1/3 py-5"
					text="취소"
					onClick={() => {
						navigate("/purchase");
					}}
				/>
			</div>
		</div>
	);
};

export default PurchaseFinalPage;
