import { useState } from "react";
import CurrentTime from "./components/currentTime";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<CurrentTime />
		</>
	);
}

export default App;
