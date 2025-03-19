import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
	Outlet,
} from "react-router-dom";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import List from "./pages/List";

import { AuthContextProvider } from "./contexts/AuthContext";
import { SideBarContextProvider } from "./contexts/SideBarContext";

const Providers = () => (
	<AuthContextProvider>
		<SideBarContextProvider>
			<Outlet />
		</SideBarContextProvider>
	</AuthContextProvider>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Providers />, 
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
