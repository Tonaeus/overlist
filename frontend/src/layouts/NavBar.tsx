import { Link } from "react-router-dom";
import { Logout, Menu } from "@mui/icons-material";
import useSideBarContext from "../hooks/useSideBarContext";
import useLogOut from "../hooks/useLogOut";

const NavBar = () => {
	const { logOut } = useLogOut();
	const { toggleSideBar } = useSideBarContext();

	const handleSideBar = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleSideBar();
	};

	const handleLogOut = () => {
		logOut();
	};

	return (
		<div className="flex flex-row h-14">
			<div className="flex-1 pl-6 flex justify-start items-center">
				<button type="button" className="button-nav" onClick={handleSideBar}>
					<Menu fontSize="medium" />
				</button>
			</div>
			<div className="flex-1 flex justify-center items-center">
				<Link to="/directory/" className="text-3xl font-bold">
					Overlist
				</Link>
			</div>
			<div className="flex-1 pr-6 flex justify-end items-center">
				<button type="button" className="button-nav" onClick={handleLogOut}>
					<Logout fontSize="medium" />
				</button>
			</div>
		</div>
	);
};

export default NavBar;
