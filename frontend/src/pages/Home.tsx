import HomeSideBar from "../components/HomeSideBar";
import HomeTable from "../components/HomeTable";
import PageWithSidebar from "../layouts/TableWithSideBar";

import { DirectoriesContextProvider } from "../contexts/DirectoriesContext.tsx";

const Home = () => {
	return (
		<DirectoriesContextProvider>
			<PageWithSidebar sidebar={<HomeSideBar />} table={<HomeTable />} />
		</DirectoriesContextProvider>
	);
};

export default Home;
