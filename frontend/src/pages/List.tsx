import ListSideBar from "../components/ListSideBar";
import ListTable from "../components/ListTable";
import PageWithSidebar from "../layouts/TableWithSideBar";

import { ListColumnsContextProvider } from "../contexts/ListColumnsContext.tsx";
import { EditingContextProvider } from "../contexts/EditingContext.tsx";

const List = () => {
	return (
		<EditingContextProvider>
			<ListColumnsContextProvider>
				<PageWithSidebar sidebar={<ListSideBar />} table={<ListTable />} />
			</ListColumnsContextProvider>
		</EditingContextProvider>
	);
};

export default List;
