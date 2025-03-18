import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import List from "./pages/List";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
			{ index: true, element: <Navigate to="/directory/" replace /> },
			{ path: "/signup/", element: <SignUp /> },
			{ path: "/login/", element: <LogIn /> },
			{ path: "/directory/", element: <Home /> },
			{ path: "/directory/:id", element: <Home /> },
			{ path: "/list/", element: <List /> },
			{ path: "/list/:id", element: <List /> },
			{ path: "*", element: <Navigate to="/directory/" replace /> },
		],
	},
]);

const App = () => <RouterProvider router={router} />;

export default App;
