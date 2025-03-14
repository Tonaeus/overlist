import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
	Outlet,
} from "react-router-dom";

import NavBar from "./layouts/NavBar";
import Home from "./pages/Home";
import List from "./pages/List";

const Layout = () => (
	<div className="flex flex-col h-screen">
		<NavBar />
		<div className="flex-1">
			<Outlet />
		</div>
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Navigate to="/directory/" replace /> },
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
