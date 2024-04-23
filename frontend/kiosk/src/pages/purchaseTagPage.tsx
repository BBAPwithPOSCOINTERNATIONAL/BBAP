import React from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import Button from "../components/button";

const PurchaseTagPage: React.FC = () => {
	const navigation = useNavigate();
	return (
		<>
			<Header text="결제하기" className="" />
			<div id="body">
				<div className="flex space-x-20 my-48 justify-center">
					<div
						className="border border-2 border-primary-color bg-[#E2F1FF] rounded-2xl w-[850px] h-[1100px] px-10"
						style={{
							boxShadow: "15px 15px 5px lightgray",
						}}
					>
						<img
							src="assets/images/사원증.png"
							alt=""
							className="h-2/3 my-6 mx-auto z-50"
						/>
						<p className="text-center text-xl text-primary-color font-bold">
							사원증을 키오스크 <br />
							하단에 태그하세요
						</p>
					</div>
				</div>
				<Button
					className="absolute bottom-[130px] left-[400px] bg-bg-color text-white text-xl w-1/3 py-5"
					text="이전으로"
					onClick={() => {
						navigation("/purchase");
					}}
				/>
			</div>
		</>
	);
};

export default PurchaseTagPage;
