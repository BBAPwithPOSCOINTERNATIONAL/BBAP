import React, { useState, useEffect } from "react";

const EntryCarousel: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const slides = [
		"/assets/images/카페 케로셀1.jpg",
		"/assets/images/카페 케로셀2.png",
	];

	// const moveToSlide = (index: number) => {
	// 	setCurrentIndex(index);
	// };

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="w-full m-0">
			<div className="relative overflow-hidden">
				<div className="flex">
					{slides.map((slide, index) => (
						<div
							key={index}
							className={`w-full carousel-slide ${
								index === currentIndex ? "block" : "hidden"
							}`}
						>
							<img
								src={slide}
								alt={`Slide ${index + 1}`}
								className="w-full h-[1200px]"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EntryCarousel;
