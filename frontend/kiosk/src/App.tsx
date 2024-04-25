import { Route, Routes } from "react-router-dom";
import { useAutoReset } from "./hooks/useAutoReset";
import EntryPage from "./pages/entryPage";
import MainPage from "./pages/mainPage";
import PaymentPage from "./pages/paymentPage";
import PaymentTagPage from "./pages/paymentTagPage";
import PaymentFacePage from "./pages/paymentFacePage";
import PaymentLoginPage from "./pages/paymentLoginPage";
import PaymentFinalPage from "./pages/paymentFinalPage";
import GamePage from "./pages/gamePage";

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
		</Routes>
	);
}

export default App;
