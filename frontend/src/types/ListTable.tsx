type ListTableColumn = {
	id: string;
	label: string;
	renderCell: (row: ListTableRow, isEditing: boolean) => JSX.Element;
	hide: boolean;
};

type ListTableRow = {
	id: string;
	[key: string]: string;
};

export type { ListTableColumn, ListTableRow };
