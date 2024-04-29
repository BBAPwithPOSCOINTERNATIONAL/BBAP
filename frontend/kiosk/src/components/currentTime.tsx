import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const CurrentTime: React.FC = () => {
	const [currentTime, setCurrentTime] = useState<string>("");
	const [count, setCount] = useState<number>(0);

	const navigate = useNavigate();

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, "0");
			const day = String(now.getDate()).padStart(2, "0");
			const hours = String(now.getHours() % 12 || 12).padStart(2, "0");
			const minutes = String(now.getMinutes()).padStart(2, "0");
			const ampm = now.getHours() >= 12 ? "PM" : "AM";
			setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes} ${ampm}`);
		}, 1000); // Update every second

		// Clean up the interval when the component unmounts
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (count === 5) {
			navigate("/restaurant");
		}
	}, [count]);

	return (
		<div
			onClick={() => {
				setCount((prev) => prev + 1);
			}}
		>
			<p className="text-sm font-bold text-primary-color">{currentTime}</p>
		</div>
	);
};

export default CurrentTime;
