import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./customKeyboard.css";

interface Props {
	setInput: React.Dispatch<React.SetStateAction<string>>;
}

const CustomKeyboard: React.FC<Props> = ({ setInput }) => {
	const [layoutName, setLayoutName] = useState<string>("default");

	const onKeyPress = (button: string) => {
		if (
			![
				"{tab}",
				"{lock}",
				"{shift}",
				"{space}",
				"{shift}",
				"{enter}",
				"{bksp}",
			].includes(button)
		) {
			setInput((prev) => {
				return prev + button;
			});
		} else if (button === "{shift}" || button === "{lock}") {
			handleShift();
		} else if (button === "{bksp}") {
			setInput((prev) => {
				return prev.slice(0, -1);
			});
		} else if (button === "{space}") {
			setInput((prev) => {
				return prev + " ";
			});
		}
	};

	const handleShift = () => {
		setLayoutName((prevLayoutName) =>
			prevLayoutName === "default" ? "shift" : "default"
		);
	};

	return <Keyboard layoutName={layoutName} onKeyPress={onKeyPress} />;
};

export default CustomKeyboard;
