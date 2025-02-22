type ListColumn = {
	id: string;
	label: string;
};

type ListColumnsState = {
	listColumns: ListColumn[];
};

type ListColumnsAction =
	| { type: "SET_LIST_COLUMNS"; payload: ListColumn[] }
	| { type: "CREATE_LIST_COLUMN"; payload: ListColumn }
	| { type: "UPDATE_LIST_COLUMN"; payload: ListColumn }
	| { type: "DELETE_LIST_COLUMN"; payload: ListColumn };

export type { ListColumn, ListColumnsState, ListColumnsAction };
