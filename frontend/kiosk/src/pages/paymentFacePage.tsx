import React from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import Button from "../components/button";
import Webcam from "react-webcam";

const PaymentFacePage: React.FC = () => {
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const webcamRef = React.useRef<any>(null);
	return (
		<>
			<Header text="결제하기" className="" />
			<div id="body" className="my-32">
				<div className="text-center text-lg my-10">
					가이드라인 안쪽으로 <br />
					얼굴을 위치시켜주세요
				</div>
				<div
					id="frame"
					className="border border-2 border-primary-color rounded-2xl w-[850px] h-[850px] px-10 mx-auto relative"
					style={{
						boxShadow: "15px 15px 5px lightgray",
						overflow: "hidden",
					}}
				>
					<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
						<img src="assets/images/guideLine.png" alt="" className="w-2/3" />
					</div>
					<Webcam
						audio={false}
						height="100%"
						width="100%"
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						style={{
							position: "absolute",
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
						}}
					/>
				</div>
				{/* TODO: 얼굴인식 되면 체크표시, 문제가 있어서 안되면 X 표시 뜨도록 해야함 */}
			</div>
			<div className="w-full absolute bottom-[150px] text-center">
				<Button
					className="bg-bg-color text-white text-xl w-1/3 py-5"
					text="이전으로"
					onClick={() => {
						navigate("/payment");
					}}
				/>
			</div>
		</>
	);
};

export default PaymentFacePage;
