import Footer from "../layouts/Footer";
import useSideBarContext from "../hooks/useSideBarContext.tsx";

type PageLayoutProps = {
	sidebar: JSX.Element;
	table: JSX.Element;
};

const PageLayout = ({ sidebar, table }: PageLayoutProps) => {
	const { isSideBarVisible } = useSideBarContext();

	return (
		<div className="page h-[calc(100vh-3.5rem)]">
			<div className={`page-side-bar ${isSideBarVisible ? "" : "hidden"}`}>
				{sidebar}
			</div>
			<div
				className={`page-content ${!isSideBarVisible ? "" : "rounded-tl-3xl"}`}
			>
				<div className="flex flex-col min-h-screen">
					<div className="p-6">{table}</div>
					<div className="mt-auto mx-6 border-t border-line">
						<Footer />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageLayout;
