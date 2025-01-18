import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import List from "./pages/List";

const App = () => {
	return (
		<div className="flex flex-col h-screen">
			<BrowserRouter>
				<NavBar/>
				<div className="flex-1">
          <Routes>
            <Route path="/" element={<Home/>}/>
						<Route path="/list" element={<List/>}/>
          </Routes>
        </div>
			</BrowserRouter>
		</div>
	);
};

export default App;
