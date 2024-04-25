import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCartStore from "../store/cartStore";

export const useAutoReset = (timeoutDuration: number) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { resetCart } = useCartStore();

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				if (location.pathname !== "/") {
					navigate("/");
					resetCart();
				}
			}, timeoutDuration);
		};

		// 활동 감지를 위한 이벤트 리스너 추가
		const events = ["mousemove", "keydown", "scroll", "touch"];
		events.forEach((event) => document.addEventListener(event, resetTimer));

		// 초기 타이머 설정
		resetTimer();

		// Cleanup 함수
		return () => {
			clearTimeout(timeoutId);
			events.forEach((event) =>
				document.removeEventListener(event, resetTimer)
			);
		};
	}, [navigate, timeoutDuration]);
};
