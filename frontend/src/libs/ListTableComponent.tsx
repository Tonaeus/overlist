import type { TableComponentProps } from "../types/TableComponent";

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

const ListTableComponent = ({
	columns,
	data,
	theme,
	select,
	emptyMessage,
}: TableComponentProps) => {
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

export default ListTableComponent;
