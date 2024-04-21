import React from "react";
interface ButtonProps {
	onClick?: () => void;
	text: string;
	className: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className }) => {
	return (
		<button className={`${className} rounded-xl text-white`} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
