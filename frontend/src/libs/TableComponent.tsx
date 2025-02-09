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

type TableComponentProps = {
	columns: any;
	data: any;
	theme: any;
	select: any;
};

const TableComponent = ({
	columns,
	data,
	theme,
	select,
}: TableComponentProps) => {
	return (
		<div className="bg-white p-1.5 rounded accent-blue-700 border border-line">
			<div className="overflow-x-auto">
				<Table
					data={data}
					theme={theme}
					select={select}
					layout={{ custom: true }}
					className="table"
				>
					{(tableList: any) => (
						<>
							<Header>
								<HeaderRow className="header-row">
									<HeaderCellSelect className="header-cell" />
									{columns.map((column: any) => (
										<HeaderCell key={column.id} className="header-cell">
											{column.label}
										</HeaderCell>
									))}
								</HeaderRow>
							</Header>
							<Body>
								{tableList.map((row: any) => (
									<Row item={row} key={row.id} className="row">
										<CellSelect item={row} />
										{columns.map((column: any) => (
											<Cell key={column.id} className="cell">
												{column.renderCell(row)}
											</Cell>
										))}
									</Row>
								))}
							</Body>
						</>
					)}
				</Table>
				{data.nodes.length === 0 ? (
					<div className="flex justify-center items-center h-9">
						<p>No lists</p>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default TableComponent;
