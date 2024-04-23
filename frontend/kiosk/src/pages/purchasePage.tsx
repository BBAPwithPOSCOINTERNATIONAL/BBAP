import React from "react";
import { useNavigate } from "react-router";
import useCartStore from "../store/cartStore";
import Button from "../components/button";

const PurchasePage: React.FC = () => {
	const { totalPrice } = useCartStore();
	const navigation = useNavigate();
	return (
		<>
			<div
				id="header"
				className="h-38 bg-primary-color text-white text-center font-bold text-2xl py-6 shadow shadow-lg"
			>
				결제하기
			</div>
			<div id="body">
				<div className="flex justify-center space-x-20 text-xl font-bold mt-32 mb-52">
					<span>총 결제금액</span>
					<span className="text-active-color">
						{totalPrice.toLocaleString()} 원
					</span>
				</div>
				<div className="flex flex-col space-y-20">
					<div className="flex space-x-20 justify-center">
						<div
							className="border border-2 border-primary-color bg-[#E2F1FF] rounded-2xl w-[450px] h-[600px]"
							style={{
								boxShadow: "15px 15px 5px lightgray",
							}}
						>
							<img
								src="assets/images/사원증.png"
								alt=""
								className="h-2/3 my-6 mx-auto"
							/>
							<p className="text-center text-2xl text-primary-color font-bold">
								사원증 태그
							</p>
						</div>
						<div
							className="border border-2 border-primary-color bg-[#E2F1FF] rounded-2xl w-[450px] h-[600px]"
							style={{
								boxShadow: "15px 15px 5px lightgray",
							}}
						>
							<img
								src="assets/images/얼굴인식.png"
								alt=""
								className="h-2/3 my-6 mx-auto"
							/>
							<p className="text-center text-2xl text-primary-color font-bold">
								얼굴 인식
							</p>
						</div>
					</div>
					<div
						className="mx-auto border border-2 border-primary-color bg-[#E2F1FF] rounded-2xl w-[980px] h-[200px] flex items-center justify-center"
						style={{
							boxShadow: "15px 15px 5px lightgray",
						}}
					>
						<p className="text-3xl text-primary-color font-bold">
							사번 입력으로 결제
						</p>
					</div>
				</div>
				<div className="flex mt-[250px] justify-center items-center">
					<Button
						className="bg-bg-color text-white text-xl w-1/3 py-5"
						text="이전으로"
						onClick={() => {
							navigation(-1);
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default PurchasePage;
