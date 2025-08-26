import { useContext } from "react";
import { DirectoriesContext } from "../contexts/DirectoriesContext";

const useDirectoriesContext = () => {
	const context = useContext(DirectoriesContext);

	if (!context) {
		throw Error(
			"useDirectoriesContext must be used inside a DirectoriesContextProvider."
		);
	}

	return context;
};

export default useDirectoriesContext;
