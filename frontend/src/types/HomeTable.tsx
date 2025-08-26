type HomeTableColumn = {
	id: number;
	label: string;
	renderCell: (row: HomeTableRow) => JSX.Element | string;
};

type HomeTableRow = {
	id: string;
	label: string;
	directory_label: string;
	created: string;
	modified: string;
};

export type { HomeTableColumn, HomeTableRow };
