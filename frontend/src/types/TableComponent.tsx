type useTableComponentProps = {
	rows: any;
	tableStyles: Record<string, string>;
};

type TableComponentProps = {
	columns: any;
	data: any;
	theme: any;
	select: any;
	emptyMessage: string;
};

export type { useTableComponentProps, TableComponentProps };
