import React, { useState, useEffect } from "react";
import CurrentTime from "../components/currentTime";

const MainPage: React.FC = () => {
	const tapItems = ["인기", "커피", "음료", "디저트"];
	const [activeTapItem, setActiveTapItem] = useState<string>(tapItems[0]);

	const handleTapItemClick = (tap: string) => {
		setActiveTapItem(tap);
	};

	return (
		<div className="w-full h-screen bg-white">
			<div id="header" className="flex justify-between p-8">
				<img
					src="/assets/images/포스코인터내셔널_로고.png"
					alt=""
					className="w-[300px]"
				/>
				<CurrentTime />
			</div>
			<div className="m-10">
				<div
					id="menu-header"
					className="text-lg text-center text-white flex justify-start space-x-5"
				>
					{tapItems.map((item, index) => (
						<div
							className={`transition-all rounded-t-3xl ${
								activeTapItem === item
									? "w-1/4 bg-active-color"
									: "w-1/5 bg-primary-color"
							} py-4`}
							key={index}
							onClick={() => handleTapItemClick(item)}
						>
							{item}
						</div>
					))}
				</div>
				<div
					id="menu-body"
					className="border border-primary-color rounded-b-3xl rounded-r-3xl h-[1600px]"
				>
					{/* menuItem 카드 렌더링 */}
				</div>
			</div>
		</div>
	);
};

export default MainPage;
