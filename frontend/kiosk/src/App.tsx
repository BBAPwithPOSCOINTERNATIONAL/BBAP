import { Route, Routes } from "react-router-dom";
import EntryPage from "./pages/entryPage";
import MainPage from "./pages/mainPage";
import PurchasePage from "./pages/purchasePage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<EntryPage />}></Route>
			<Route path="/main" element={<MainPage />}></Route>
			<Route path="/purchase" element={<PurchasePage />}></Route>
		</Routes>
	);
}

export default App;
