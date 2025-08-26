import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";
import useSideBarContext from "../hooks/useSideBarContext.tsx";

type TableAndSideBarProps = {
	sidebar: JSX.Element;
	table: JSX.Element;
};

const TableAndSideBar = ({ sidebar, table }: TableAndSideBarProps) => {
	const { isSideBarVisible } = useSideBarContext();

	return (
		<div className="flex flex-col h-screen">
			<NavBar />
			<div className="flex-1">
				<div className="flex flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
					<div
						className={`overflow-hidden transition-all duration-300 overflow-y-auto
		                        ${
															isSideBarVisible
																? "w-full lg:w-64 pl-6 pb-6"
																: "w-0"
														}`}
					>
						{sidebar}
					</div>
					<div
						className={`flex flex-col flex-1 bg-section border-l border-t border-line overflow-x-hidden transition-all duration-300
		                        ${!isSideBarVisible ? "" : "rounded-tl-3xl"}`}
					>
						<div className="flex flex-col min-h-screen">
							<div className="p-6">{table}</div>
							<div className="mt-auto mx-6 border-t border-line">
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TableAndSideBar;
