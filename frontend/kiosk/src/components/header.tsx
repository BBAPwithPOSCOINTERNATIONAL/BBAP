import React from "react";

interface HeaderProps {
	text: string;
	className: string;
}

const Header: React.FC<HeaderProps> = ({ text, className }) => {
	return (
		<div
			id="header"
			className={`h-28 w-full bg-primary-color text-white text-center font-bold text-2xl py-6 shadow shadow-lg" ${className}`}
		>
			{text}
		</div>
	);
};

export default Header;
