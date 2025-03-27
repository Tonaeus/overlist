import type { TableComponentProps } from "../types/TableComponent";

import { useEffect } from "react";
import useEditingContext from "../hooks/useEditingContext";

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
}: TableComponentProps) => {
	const { isEditing } = useEditingContext();

	useEffect(() => {
		const checkboxes = document.querySelectorAll(
			'input[type="checkbox"].css-e0dnmk'
		) as NodeListOf<HTMLInputElement>;

		checkboxes.forEach((checkbox) => {
			checkbox.disabled = isEditing;
		});
	}, [isEditing]);

	const columnCount = columns.filter((col: any) => col.label !== "").length;

	return (
		<div
			className={`bg-white rounded accent-blue-700 border border-line ${
				columnCount > 0 ? "p-1.5" : "relative py-1.5"
			}`}
		>
			{columnCount > 0 ? null : (
				<div className="flex flex-col w-full absolute z-10 px-1">
					<div className="flex flex-col">
						<div className="h-9 w-[38px] flex justify-center items-center">
							<input
								type="checkbox"
								checked={false}
								className="cursor-pointer"
							></input>
						</div>
						<div style={{ height: "1px", backgroundColor: "#DDE2EB" }}></div>
					</div>
					<div className="h-9"></div>
				</div>
			)}
			<div className={`overflow-x-auto`}>
				<Table
					data={data}
					theme={theme}
					select={select}
					layout={{ custom: true }}
					className="table"
					style={{ visibility: columnCount > 0 ? "visible" : "hidden" }}
				>
					{(tableList: any) => (
						<>
							<Header>
								<HeaderRow className="header-row">
									<HeaderCellSelect className="header-cell" />
									{columns.map((column: any, index: number) => (
										<HeaderCell
											key={index}
											className="header-cell"
											hide={column.hide}
										>
											{column.label}
										</HeaderCell>
									))}
								</HeaderRow>
							</Header>
							<Body>
								{tableList.map((row: any, index: number) => (
									<Row item={row} key={index} className="row">
										<CellSelect item={row} />
										{columns.map((column: any, index: number) => (
											<Cell key={index} className="cell" hide={column.hide}>
												{column.renderCell(row, isEditing)}
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

export default ListTableComponent;
