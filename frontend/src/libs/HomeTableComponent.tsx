import type { TableComponentProps } from "../types/TableComponent";

import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	Cell,
} from "@table-library/react-table-library/table";

import {
	HeaderCellSelect,
	CellSelect,
} from "@table-library/react-table-library/select";

import {
	HeaderCellSort
} from "@table-library/react-table-library/sort";

const HomeTableComponent = ({
	columns,
	data,
	theme,
	select,
	sort,
}: TableComponentProps) => {
	return (
		<div className="bg-white p-1.5 rounded accent-blue-700 border border-line">
			<div className="overflow-x-auto">
				<Table
					data={data}
					theme={theme}
					select={select}
					sort={sort}
					layout={{ custom: true }}
					className="table"
				>
					{(tableList: any) => (
						<>
							<Header>
								<HeaderRow className="header-row">
									<HeaderCellSelect className="header-cell" />
									{columns.map((column: any, index: number) => (
										<HeaderCellSort key={index} sortKey={column.label} className="header-cell">
											{column.label}
										</HeaderCellSort>
									))}
								</HeaderRow>
							</Header>
							<Body>
								{tableList.map((row: any, index: number) => (
									<Row item={row} key={index} className="row">
										<CellSelect item={row} />
										{columns.map((column: any, index: number) => (
											<Cell key={index} className="cell">
												{column.renderCell(row)}
											</Cell>
										))}
									</Row>
								))}
							</Body>
						</>
					)}
				</Table>
				{data.nodes.length === 0 ? <div className="h-9"></div> : null}
			</div>
		</div>
	);
};

export default HomeTableComponent;
