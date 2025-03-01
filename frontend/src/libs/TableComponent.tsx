import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from "@table-library/react-table-library/table";

import {
	HeaderCellSelect,
	CellSelect,
} from "@table-library/react-table-library/select";

// import { useTheme } from "@table-library/react-table-library/theme";
// import { getTheme } from "@table-library/react-table-library/baseline";

type TableComponentProps = {
	columns: any;
	data: any;
	theme: any;
	select: any;
	emptyMessage: string;
};

const TableComponent = ({
	columns,
	data,
	theme,
	select,
	emptyMessage,
}: TableComponentProps) => {
	// theme = useTheme([
	// 	getTheme(),
	// 	{
	// 		Table: `;
	// 			min-width: calc(38px + 125px * ${columns.length});
	// 		`,
	// 		BaseCell: `
	// 			&:nth-of-type(1) {
	// 				width: 38px;
	//       }
	// 			&:not(:nth-of-type(1)) {
	// 				width: 1fr;
	// 				min-width: 125px;
	// 			}
	// 		`,
	// 		// 	HeaderRow: `
	// 		// 	&.header-row {
	// 		// 		color: #495365;
	// 		// 	}
	// 		// `,
	// 		// 	HeaderCell: `
	// 		// 	&.header-cell:hover {
	// 		// 		background-color: #F4F5F6;
	// 		// 	}
	// 		// 	&:nth-of-type(1) {
	// 		// 		width: 38px;
	// 		// 	}
	// 		// `,
	// 		// 	Row: `
	// 		// 	&.row {
	// 		// 		color: #495365;
	// 		// 	}
	// 		// 	&.row:hover {
	// 		// 		color: #495365;
	// 		// 		background-color: #F4F5F6;
	// 		// 	}
	// 		// 	&.row-select-selected {
	// 		// 		background-color: #EFF6FF;
	// 		// 		font-weight: normal;
	// 		// 	}
	// 		// `,
	// 		// 	Cell: `
	// 		// 	&.cell {
	// 		// 	}
	// 		// 	&:nth-of-type(1) {
	// 		// 		width: 38px;
	// 		// 	}
	// 		// `,
	// 	},
	// ]);

	return (
		<div className="bg-white p-1.5 rounded accent-blue-700 border border-line">
			<div className="overflow-x-auto">
				<Table
					key={columns.length}
					data={data}
					theme={theme}
					select={select}
					className="table"
					style={{ overflow: "hidden" }}
				>
					{(tableList: any) => (
						<>
							<Header>
								<HeaderRow className="header-row">
									<HeaderCellSelect className="header-cell" />
									<>
										{columns.map((column: any, index: number) => (
											<HeaderCell key={index} className="header-cell">
												{column.label}
											</HeaderCell>
										))}
									</>
								</HeaderRow>
							</Header>
							<Body>
								{tableList.map((row: any, index: number) => (
									<Row item={row} key={index} className="row">
										<CellSelect item={row} />
										<>
											{columns.map((column: any, index: number) => (
												<Cell key={index} className="cell">
													{column.renderCell(row)}
												</Cell>
											))}
										</>
									</Row>
								))}
							</Body>
						</>
					)}
				</Table>
				{data.nodes.length === 0 ? (
					<div className="flex justify-center items-center h-9">
						<p>{emptyMessage}</p>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default TableComponent;
