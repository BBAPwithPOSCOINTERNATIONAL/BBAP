import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import Button from "../components/button";

// 한영 전환 수정 필요함
const koreanKeys = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ";
const englishKeys =
	"qwe r t y u i o p a s d f g h j k l ; ' z x c v b n m , . /";

const PurchaseTagPage: React.FC = () => {
	const navigation = useNavigate();
	const [tagValue, setTagValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	const activeEnter = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			let result = "";
			for (let char of tagValue) {
				const idx = koreanKeys.indexOf(char);
				if (idx !== -1) {
					result += englishKeys[idx];
				} else {
					result += char;
				}
			}

			console.log(result);
			setTagValue("");
			// TODO:
			// 키보드 영문 입력만 되도록 앱 차원에서 막아야 함
			// 카드번호 담아서 서버에 사원정보 요청 => 에러나면 에러 모달 뜨도록 하기
		}
	};

	return (
		<>
			<Header text="결제하기" className="" />
			<div id="body">
				<input
					ref={inputRef}
					type="text"
					id="tag-value"
					style={{ imeMode: "inactive" }}
					// className="absolute top-[-9999px] w-2"
					value={tagValue}
					onChange={(e) => setTagValue(e.target.value)}
					onKeyDown={(e) => {
						activeEnter(e);
					}}
				/>
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
