type ListTableColumn = {
	id: string;
	label: string;
	renderCell: (row: ListTableRow) => JSX.Element;
};

type ListTableRow = {
	id: string;
	[key: string]: string;
};

export type { ListTableColumn, ListTableRow };
