import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<NavBar />
				<div>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
			</BrowserRouter>
		</div>
	);
};

export default App;
