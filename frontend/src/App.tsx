import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";

import NavBar from "./layouts/NavBar";
import Home from "./pages/Home";
import List from "./pages/List";

type LayoutProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
	<div className="flex flex-col h-screen">
		<NavBar />
		<div className="flex-1">{children}</div>
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/directory/" replace />,
	},
	{
		path: "/directory/",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: "/directory/:id",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: "/list",
		element: (
			<Layout>
				<List />
			</Layout>
		),
	},
	{
		path: "/list/:id",
		element: (
			<Layout>
				<List />
			</Layout>
		),
	},
	{
		path: "*",
		element: <Navigate to="/directory/" replace />,
	},
]);

const App = () => <RouterProvider router={router} />;

export default App;
