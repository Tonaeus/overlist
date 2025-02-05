import type { DirectoriesState, DirectoriesAction } from "../types/Directory";

import { createContext, Dispatch, useReducer } from "react";

import directoriesReducer from "./directoriesReducer";

const DirectoriesContext = createContext<{
	state: DirectoriesState;
	dispatch: Dispatch<DirectoriesAction>;
} | null>(null);

const DirectoriesContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(directoriesReducer, { directories: [] });

	return (
		<DirectoriesContext.Provider value={{ state, dispatch }}>
			{children}
		</DirectoriesContext.Provider>
	);
};

export { DirectoriesContext, DirectoriesContextProvider };
