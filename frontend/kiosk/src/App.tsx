import { Route, Routes } from "react-router-dom";
import "./App.css";
import EntryPage from "./pages/entryPage";
import MainPage from "./pages/mainPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<EntryPage />}></Route>
			<Route path="/main" element={<MainPage />}></Route>
		</Routes>
	);
}

export default App;
