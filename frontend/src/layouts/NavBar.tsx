import { Link } from "react-router-dom";
import { Menu, Person } from "@mui/icons-material";
import useSideBarContext from "../hooks/useSideBarContext";

const NavBar = () => {
	const { toggleSideBar } = useSideBarContext();

	const handleSideBar = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleSideBar();
	};

	return (
		<div className="flex flex-row h-14">
			<div className="flex-1 pl-6 flex justify-start items-center">
				<button className="button-side-bar aspect-[1/1]" onClick={handleSideBar}>
					<Menu fontSize="medium" />
				</button>
			</div>
			<div className="flex-1 flex justify-center items-center">
				<Link to="/directory/" className="text-3xl font-bold">
					Overlist
				</Link>
			</div>
			<div className="flex-1 pr-10 flex justify-end items-center">
				<Person fontSize="medium" />
			</div>
		</div>
	);
};

export default NavBar;
