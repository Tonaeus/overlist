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

import useAuthContext from "./hooks/useAuthContext";

const Providers = () => (
	<AuthContextProvider>
		<SideBarContextProvider>
			<Outlet />
		</SideBarContextProvider>
	</AuthContextProvider>
);

const AuthRedirect = () => {
	const {
		state: { user },
	} = useAuthContext();

	return user ? <Navigate to="/directory/" replace /> : <Outlet />;
};

const ProtectedRoute = () => {
	const {
		state: { user },
	} = useAuthContext();

	return user ? <Outlet /> : <Navigate to="/login/" replace />;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Providers />,
		children: [
			{ index: true, element: <Navigate to="/directory/" replace /> },
			{
				path: "/signup/",
				element: <AuthRedirect />,
				children: [{ index: true, element: <SignUp /> }],
			},
			{
				path: "/login/",
				element: <AuthRedirect />,
				children: [{ index: true, element: <LogIn /> }],
			},
			{
				path: "/directory/",
				element: <ProtectedRoute />,
				children: [
					{ index: true, element: <Home /> },
					{ path: ":id", element: <Home /> },
				],
			},
			{
				path: "/list/",
				element: <ProtectedRoute />,
				children: [
					{ index: true, element: <List /> },
					{ path: ":id", element: <List /> },
				],
			},
			{ path: "*", element: <Navigate to="/directory/" replace /> },
		],
	},
]);

const App = () => <RouterProvider router={router} />;

export default App;
