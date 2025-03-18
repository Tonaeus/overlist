import type { ListColumnsState, ListColumnsAction } from "../types/ListColumn";

const listColumnsReducer = (
	state: ListColumnsState,
	action: ListColumnsAction
) => {
	switch (action.type) {
		case "SET_LIST_COLUMNS":
			return {
				listColumns: action.payload,
			};
		default:
			return state;
	}
};

export default listColumnsReducer;
