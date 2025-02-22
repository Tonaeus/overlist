import type { ListColumnsState, ListColumnsAction } from "../types/ListColumn";

import { createContext, Dispatch, useReducer } from "react";

import listColumnsReducer from "./listColumnsReducer";

const ListColumnsContext = createContext<{
	state: ListColumnsState;
	dispatch: Dispatch<ListColumnsAction>;
} | null>(null);

const ListColumnsContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [state, dispatch] = useReducer(listColumnsReducer, { listColumns: [] });

	return (
		<ListColumnsContext.Provider value={{ state, dispatch }}>
			{children}
		</ListColumnsContext.Provider>
	);
};

export { ListColumnsContext, ListColumnsContextProvider };
