import { Route, Routes } from "react-router-dom";
import EntryPage from "./pages/entryPage";
import MainPage from "./pages/mainPage";
import PurchasePage from "./pages/purchasePage";
import PurchaseTagPage from "./pages/purchaseTagPage";
import PurchaseFacePage from "./pages/purchaseFacePage";
import PurchaseLoginPage from "./pages/purchaseLoginPage";
import PurchaseFinalPage from "./pages/purchaseFinalPage";
import GamePage from "./pages/gamePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<EntryPage />}></Route>
			<Route path="/main" element={<MainPage />}></Route>
			<Route path="/purchase" element={<PurchasePage />}></Route>
			<Route path="/purchase-tag" element={<PurchaseTagPage />}></Route>
			<Route path="/purchase-face" element={<PurchaseFacePage />}></Route>
			<Route path="/purchase-login" element={<PurchaseLoginPage />}></Route>
			<Route path="/purchase-final" element={<PurchaseFinalPage />}></Route>
			<Route path="/game" element={<GamePage />}></Route>
		</Routes>
	);
}

export default App;
