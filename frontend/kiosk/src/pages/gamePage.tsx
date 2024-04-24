import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "../components/header";
import Button from "../components/button";

const generatePastelColor = () => {
	const baseColor = Math.floor(Math.random() * 360); // Random hue
	const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation (70-100)
	const lightness = Math.floor(Math.random() * 20) + 70; // Random lightness (70-90)
	return `hsl(${baseColor}, ${saturation}%, ${lightness}%)`;
};

const GamePage = () => {
	const [touchPoints, setTouchPoints] = useState([]);
	const [selectedPoint, setSelectedPoint] = useState(null);
	const [countdown, setCountdown] = useState(3);
	const [gameStarted, setGameStarted] = useState(false);
	const [index, setIndex] = useState(1);

	useEffect(() => {
		let timer;
		if (gameStarted && countdown > 0) {
			timer = setTimeout(() => {
				setCountdown((prevCount) => prevCount - 1);
			}, 1000);
		} else if (countdown === 0) {
			selectRandomPoint();
		}
		return () => clearTimeout(timer);
	}, [gameStarted, countdown]);

	const handleTouchStart = (event) => {
		if (selectedPoint) {
			setSelectedPoint(null);
		}
		const touches = event.changedTouches;
		console.log(touches);

		const point = {
			id: index,
			x: touches[0].clientX,
			y: touches[0].clientY,
			color: generatePastelColor(),
		};
		setIndex((prev) => prev + 1);

		setTouchPoints((prevPoints) => [...prevPoints, point]);
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
				게임 참여자는 모두 화면을 한번씩 터치하세요.
				<br /> 모두 터치했으면, 시작 버튼을 누르세요!
			</div>
			<div className="flex justify-center space-x-20 font-bold text-lg text-white">
				<Button
					text="다시"
					onClick={handleReset}
					className="w-1/4 bg-amber-300 py-5"
				/>

				<Button
					text={gameStarted ? countdown : "시작"}
					onClick={!gameStarted && handleStartGame}
					className={`w-1/4  ${gameStarted ? "bg-slate-500" : "bg-red-400"}`}
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
					<div
						key={point.id}
						style={{
							position: "absolute",
							left: `${point.x}px`,
							top: `${point.y}px`,
							width: "200px",
							height: "200px",
							backgroundColor: `${point.color}`,
							borderRadius: "50%",
							transform: "translate(-50%, -50%)",
							color: "black",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "50px",
						}}
					>
						{index + 1}
					</div>
				))}
				{selectedPoint && (
					<div
						style={{
							position: "absolute",
							left: `${selectedPoint.x}px`,
							top: `${selectedPoint.y}px`,
							width: "200px",
							height: "200px",
							backgroundColor: `${selectedPoint.color}`,
							borderRadius: "50%",
							transform: "translate(-50%, -50%)",
							color: "black",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "50px",
						}}
					>
						{selectedPoint.id}
					</div>
				)}
			</div>
			<Button
				className="absolute bottom-[130px] left-[400px] bg-bg-color text-white text-xl w-1/3 py-5"
				text="이전으로"
				onClick={() => {
					navigate("/main");
				}}
			/>
		</div>
	);
};

export default GamePage;
