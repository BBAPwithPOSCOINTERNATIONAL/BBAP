import React from "react";
interface ButtonProps {
  onClick?: () => void;
  text: string | React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className }) => {
  return (
    <button className={`${className} rounded-[8px]`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
