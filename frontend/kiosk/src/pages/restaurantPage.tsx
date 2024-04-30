import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import Button from "../components/button";
import styled, { keyframes } from "styled-components";
import { paymentRestaurantReq } from "../api/paymentApi";

// 키보드입력 한영 전환
const koreanKeys = "ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ";
const englishKeys = "qwertyuiopasdfghjklzxcvbnm";

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingText = styled.p`
	animation: ${blinkAnimation} 2s infinite; /* Apply the blinking animation */
`;

const RestaurantPage: React.FC = () => {
	const navigate = useNavigate();
	const [tagValue, setTagValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	const activeEnter = async (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			let result = "";
			for (const char of tagValue) {
				const idx = koreanKeys.indexOf(char);
				if (idx !== -1) {
					result += englishKeys[idx];
				} else {
					result += char;
				}
			}

			console.log("카드번호: ", result);
			setTagValue("");
			// TODO: 정보 담아서 서버로 POST 요청
			try {
				await paymentRestaurantReq(result);
			} catch (error) {
				console.error("식당 결제 오류:", error);
			}
		}
	};

	return (
		<>
			<div id="body" className="text-center">
				<p className="text-3xl font-bold mt-20">구내식당</p>
				<img
					src="/assets/images/구내식당.png"
					alt="순대국밥 사진"
					className="w-3/4 mx-auto my-48"
				/>
				<p className="text-xl">순대국밥</p>
				<p className="text-xl">7,000 원</p>
				<BlinkingText className="text-lg text-red-500 my-20">
					사원증을 태그하세요
				</BlinkingText>
				<input
					ref={inputRef}
					type="text"
					id="tag-value"
					style={{ imeMode: "inactive" }}
					className="absolute top-[-9999px] w-2"
					value={tagValue}
					onChange={(e) => setTagValue(e.target.value)}
					onKeyDown={(e) => {
						activeEnter(e);
					}}
				/>

				<div className="w-full absolute bottom-[150px] text-center">
					<Button
						className="bg-bg-color text-white text-xl w-1/3 py-5"
						text="처음으로"
						onClick={() => {
							navigate("/");
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default RestaurantPage;
