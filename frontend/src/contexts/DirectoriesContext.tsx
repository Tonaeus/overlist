import type { DirectoriesState, DirectoriesAction } from "../types/Directory";

import { createContext, Dispatch, useReducer } from "react";

import directoriesReducer from "../reducers/directoriesReducer";

type DirectoriesContextType = {
	state: DirectoriesState;
	dispatch: Dispatch<DirectoriesAction>;
};

const DirectoriesContext = createContext<DirectoriesContextType | undefined>(
	undefined
);

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
