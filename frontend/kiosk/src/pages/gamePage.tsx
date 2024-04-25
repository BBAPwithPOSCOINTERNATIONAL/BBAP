import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes, css } from "styled-components";
import Header from "../components/header";
import Button from "../components/button";

interface Point {
	id: number;
	x: number;
	y: number;
	color: string;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulseStyles = (props: { isPulsing: boolean }) => css`
	animation: ${props.isPulsing ? pulseAnimation : "none"} 1.2s infinite;
`;

const PointDiv = styled.div<{ isPulsing: boolean }>`
	position: absolute;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	${pulseStyles}
`;

// 파스텔톤 색을 랜덤하게 만들어주는 함수
const generatePastelColor: () => string = () => {
	const baseColor = Math.floor(Math.random() * 360);
	const saturation = Math.floor(Math.random() * 30) + 70;
	const lightness = Math.floor(Math.random() * 20) + 70;
	return `hsl(${baseColor}, ${saturation}%, ${lightness}%)`;
};

const GamePage: React.FC = () => {
	const [touchPoints, setTouchPoints] = useState<Point[]>([]);
	const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
	const [countdown, setCountdown] = useState<number>(3); // 현재 게임시작 후, 3초 뒤 포인트가 선택됨
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [index, setIndex] = useState<number>(1);
	const navigate = useNavigate();

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;
		if (gameStarted && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown((prevCount) => prevCount - 1);
			}, 1000);
		} else if (countdown === 0) {
			selectRandomPoint();
		}
		return () => clearTimeout(timer);
	}, [gameStarted, countdown]);

	const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
		if (selectedPoint) {
			setSelectedPoint(null);
		}

		if (!gameStarted) {
			const touches = event.changedTouches;

			const point: Point = {
				id: index,
				x: touches[0].clientX,
				y: touches[0].clientY,
				color: generatePastelColor(),
			};
			setIndex((prev) => prev + 1);

			setTouchPoints((prevPoints) => [...prevPoints, point]);
		}
	};

	const handleReset = () => {
		setTouchPoints([]);
		setSelectedPoint(null);
		setGameStarted(false);
		setCountdown(3);
	};

	const handleStartGame = () => {
		console.log(touchPoints);
		if (touchPoints.length > 0 && !gameStarted) {
			setGameStarted(true);
			setCountdown(3);
		}
	};

	const selectRandomPoint = () => {
		if (touchPoints.length > 0) {
			const randomIndex = Math.floor(Math.random() * touchPoints.length);
			setSelectedPoint(touchPoints[randomIndex]);
		}
		setGameStarted(false);
		setIndex(1);
		setTouchPoints([]);
	};

	return (
		<div>
			<Header text="내기하기" className="" />
			<div className="text-base font-bold text-center my-20">
				{selectedPoint ? (
					<p className="text-orange-500 text-2xl">
						오늘 카페는 {selectedPoint.id}번이 쏜다!!!
					</p>
				) : (
					<p>
						게임 참여자는 모두 화면을 한번씩 터치하세요.
						<br /> 모두 터치했으면, 시작 버튼을 누르세요!
					</p>
				)}
			</div>
			<div className="flex justify-center space-x-20 font-bold text-lg text-white">
				<Button
					text="다시"
					onClick={handleReset}
					className="w-1/5 rounded-full bg-amber-300 py-8"
				/>

				<Button
					text={gameStarted ? countdown : "시작"}
					onClick={() => {
						!gameStarted && handleStartGame();
					}}
					className={`w-1/5 rounded-full py-8 ${
						touchPoints.length == 0 || gameStarted
							? "bg-slate-400"
							: "bg-red-400"
					}`}
				/>
			</div>
			<div
				onTouchStart={handleTouchStart}
				style={{
					height: "100vh",
					width: "100vw",
					backgroundColor: "white",
					position: "absolute",
					top: 0,
					zIndex: -99,
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						fontSize: "24px",
						fontWeight: "bold",
					}}
				>
					{gameStarted ? `${countdown}` : ""}
				</div>
				{touchPoints.map((point, index) => (
					<PointDiv
						isPulsing={gameStarted}
						key={point.id}
						style={{
							left: `${point.x}px`,
							top: `${point.y}px`,
							backgroundColor: `${point.color}`,
						}}
					>
						{index + 1}
					</PointDiv>
				))}
				{selectedPoint && (
					<PointDiv
						isPulsing={true}
						style={{
							left: `${selectedPoint.x}px`,
							top: `${selectedPoint.y}px`,
							backgroundColor: `${selectedPoint.color}`,
						}}
					>
						{selectedPoint.id}
					</PointDiv>
				)}
			</div>
			<div className="w-full absolute bottom-[150px] text-center">
				<Button
					className="bg-bg-color text-white text-xl w-1/3 py-5"
					text="이전으로"
					onClick={() => {
						navigate("/main");
					}}
				/>
			</div>
		</div>
	);
};

export default GamePage;
