import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import Button from "../components/button";
import CustomKeyboard from "../components/customKeyboard.jsx";

const PurchaseLoginPage: React.FC = () => {
	const navigate = useNavigate();
	const [idNumber, setIdNumber] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [focusId, setFocusId] = useState<string>("");
	const [keyboardVisibility, setKeyboardVisibility] = useState(false);

	const handleLogin = () => {
		// TODO
		// idNumber, password 담아서 서버에 로그인 요청
		// 로그인 되면 다음 페이지로 넘어감
		// 안되면 경고 모달 뜸
		if (idNumber && password) {
			console.log({ idNumber, password });
			navigate("/purchase-final");
		}
	};

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		const { id } = event.target;
		setFocusId(id);
		setKeyboardVisibility(true);
	};

	const handleOutsideClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const { id } = event.target as HTMLDivElement;
		if (id === "outer" && keyboardVisibility) {
			setKeyboardVisibility(false);
			setFocusId("");
		}
	};

	return (
		<>
			<Header text="결제하기" className="" />
			<div id="body" onClick={handleOutsideClick}>
				<div
					id="outer"
					className="flex flex-col space-y-20 font-bold text-lg text-primary-color py-52 h-[2000px]"
				>
					<div id="outer" className="flex flex-col space-y-10 items-center">
						<label htmlFor="id-number">사원번호</label>
						<input
							type="text"
							id="id-number"
							className={`outline-none border focus:border-4 border-primary-color bg-slate-200 rounded-2xl text-lg p-5 text-center ${
								focusId === "id-number" && "border-4"
							}`}
							value={idNumber}
							onChange={(e) => setIdNumber(e.target.value)}
							onFocus={handleFocus}
						/>
					</div>
					<div id="outer" className="flex flex-col space-y-10 items-center">
						<label htmlFor="password">비밀번호</label>
						<input
							type="password"
							id="password"
							className={`outline-none border focus:border-4 border-primary-color bg-slate-200 rounded-2xl text-lg p-5 text-center ${
								focusId === "password" && "border-4"
							}`}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onFocus={handleFocus}
						/>
					</div>
				</div>
				<div className="w-full absolute bottom-[150px] flex flex-col space-y-10 items-center">
					<Button
						className={`${
							idNumber && password ? "bg-primary-color" : "bg-inactive-color"
						} text-white text-xl w-1/3 py-5`}
						text="다음"
						onClick={() => {
							handleLogin();
						}}
					/>
					<Button
						className="bg-bg-color text-white text-xl w-1/3 py-5"
						text="이전으로"
						onClick={() => {
							navigate("/purchase");
						}}
					/>
				</div>
			</div>
			{keyboardVisibility && (
				<div className="w-full absolute bottom-[600px] flex justify-center">
					<CustomKeyboard
						setInput={focusId == "id-number" ? setIdNumber : setPassword}
					/>
				</div>
			)}
		</>
	);
};

export default PurchaseLoginPage;
