import HomeSideBar from "../components/HomeSideBar";
import HomeTable from "../components/HomeTable";
import TableAndSideBar from "../layouts/TableAndSideBar.tsx";

import { DirectoriesContextProvider } from "../contexts/DirectoriesContext.tsx";

const Home = () => {
	return (
		<DirectoriesContextProvider>
			<TableAndSideBar sidebar={<HomeSideBar />} table={<HomeTable />} />
		</DirectoriesContextProvider>
	);
};

export default Home;
