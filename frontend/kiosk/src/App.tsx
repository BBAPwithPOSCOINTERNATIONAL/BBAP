import { Route, Routes } from "react-router-dom";
import { useAutoReset } from "./hooks/useAutoReset";
import EntryPage from "./pages/entryPage";
import MainPage from "./pages/mainPage";
import PaymentPage from "./pages/payment/paymentPage";
import PaymentTagPage from "./pages/payment/paymentTagPage";
import PaymentFacePage from "./pages/payment/paymentFacePage";
import PaymentLoginPage from "./pages/payment/paymentLoginPage";
import PaymentFinalPage from "./pages/payment/paymentFinalPage";
import GamePage from "./pages/gamePage";
import RestaurantPage from "./pages/restaurantPage";

function App() {
	// 특정 시간 후, 초기 화면으로 돌아가는 훅
	useAutoReset(5 * 60 * 1000);
	return (
		<Routes>
			<Route path="/" element={<EntryPage />}></Route>
			<Route path="/main" element={<MainPage />}></Route>
			<Route path="/payment" element={<PaymentPage />}></Route>
			<Route path="/payment-tag" element={<PaymentTagPage />}></Route>
			<Route path="/payment-face" element={<PaymentFacePage />}></Route>
			<Route path="/payment-login" element={<PaymentLoginPage />}></Route>
			<Route path="/payment-final" element={<PaymentFinalPage />}></Route>
			<Route path="/game" element={<GamePage />}></Route>
			<Route path="/restaurant" element={<RestaurantPage />}></Route>
		</Routes>
	);
}

export default App;
