import React, { useState, useEffect } from "react";

const CurrentTime: React.FC = () => {
	const [currentTime, setCurrentTime] = useState<string>("");

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

	return (
		<div>
			<p className="text-sm font-bold text-primary-color">{currentTime}</p>
		</div>
	);
};

export default CurrentTime;
