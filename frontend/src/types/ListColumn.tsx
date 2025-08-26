type ListColumn = {
	id: string;
	label: string;
};

type ListColumnsState = {
	listColumns: ListColumn[];
};

type ListColumnsAction = { type: "SET_LIST_COLUMNS"; payload: ListColumn[] };

export type { ListColumn, ListColumnsState, ListColumnsAction };
