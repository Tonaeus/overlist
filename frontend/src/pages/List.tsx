import Footer from "../layouts/Footer";
import ListSideBar from "../components/ListSideBar";
import ListTable from "../components/ListTable";

import { ListColumnsContextProvider } from "../contexts/ListColumnsContext.tsx";
import { EditingContextProvider } from "../contexts/EditingContext.tsx";

const List = () => {
	return (
		<EditingContextProvider>
			<ListColumnsContextProvider>
				<div className="page h-[calc(100vh-3.5rem)]">
					<div className="page-side-bar">
						<ListSideBar />
					</div>
					<div className="page-content">
						<div className="flex flex-col min-h-screen">
							<div className="p-6">
								<ListTable />
							</div>
							<div className="mt-auto mx-6 border-t border-line">
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</ListColumnsContextProvider>
		</EditingContextProvider>
	);
};

export default List;
