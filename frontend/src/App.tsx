import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./layouts/NavBar";
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
	return (
		<div className="flex flex-col h-screen">
			<BrowserRouter>
				<NavBar />
				<div className="flex-1">
					<Routes>
						<Route path="/" element={<Navigate to="/directory/" replace />} />
						<Route path="/directory/" element={<Home />} />
						<Route path="/directory/:label" element={<Home />} />
						<Route path="/list" element={<List />} />
						<Route path="*" element={<Navigate to="/directory/" replace />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
