import ListSideBar from "../components/ListSideBar";
import ListTable from "../components/ListTable";
import TableAndSideBar from "../layouts/TableAndSideBar.tsx";

import { ListColumnsContextProvider } from "../contexts/ListColumnsContext.tsx";
import { EditingContextProvider } from "../contexts/EditingContext.tsx";

const List = () => {
	return (
		<EditingContextProvider>
			<ListColumnsContextProvider>
				<TableAndSideBar sidebar={<ListSideBar />} table={<ListTable />} />
			</ListColumnsContextProvider>
		</EditingContextProvider>
	);
};

export default List;
