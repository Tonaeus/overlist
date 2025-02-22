import type { ListColumnsState, ListColumnsAction } from "../types/ListColumn";

import { sortObjectsByProp } from "../utils/sortUtils";

const listColumnsReducer = (
	state: ListColumnsState,
	action: ListColumnsAction
) => {
	switch (action.type) {
		case "SET_LIST_COLUMNS":
			return {
				listColumns: action.payload,
			};
		case "CREATE_LIST_COLUMN":
			return {
				listColumns: [...state.listColumns, action.payload].sort(
					sortObjectsByProp("label")
				),
			};
		case "UPDATE_LIST_COLUMN":
			return {
				listColumns: state.listColumns
					.map((col) => (col.id === action.payload.id ? action.payload : col))
					.sort(sortObjectsByProp("label")),
			};
		case "DELETE_LIST_COLUMN":
			return {
				listColumns: state.listColumns.filter(
					(col) => col.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default listColumnsReducer;
