import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

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
	SelectClickTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

interface Column {
	id: string;
	label: string;
	renderCell: (row: Row) => JSX.Element;
}

interface Row {
	id: string;
	[key: string]: string;
}

const ListTable = () => {
	const [columns, setColumns] = useState<Column[]>([
		{
			id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
			label: "text",
			renderCell: (item: Row) => (
				<input
					type="text"
					value={item["4e3b468c-7fa8-47d8-90a8-741bbea731ac"] || ""}
					onChange={(event) =>
						handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea731ac")
					}
					className="w-full"
				/>
			),
		},
	]);

	const [rows, setRows] = useState<Row[]>([
		{
			"id": uuidv4(),
			"4e3b468c-7fa8-47d8-90a8-741bbea731ac": "alpha",
		},
	]);

	const theme = useTheme([
		getTheme(),
		{
			Table: `
			--data-table-library_grid-template-columns: 38px repeat(${columns.length}, minmax(150px, 1fr));
			&.table {
				min-width: calc(38px + 150px * ${columns.length});
			}
      `,
			HeaderRow: `
				&.header-row {
					color: #495365;
				}
			`,
			HeaderCell: `
				&.header-cell:hover {
					background-color: #F4F5F6;
				}
				&:nth-of-type(1) {
					width: 38px;
        }
			`,
			Row: `
				&.row {
					color: #495365;
				}
				&.row:hover {
					color: #495365;
					background-color: #F4F5F6;
				}
				&.row-select-selected {
					background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
					font-weight: normal;
				}
			`,
			Cell: `
				&.cell {
				}
				&:nth-of-type(1) {
					width: 38px;
        }
			`,
		},
	]);

	const data = { nodes: rows };
	
	const onSelectChange = (selectAction: any, selectState: any) => {
		console.log("action: ", selectAction);
		console.log("state: ", selectState);
		// console.log("ids: ", state.ids);
	};

	const select = useRowSelect(
		data,
		{
			onChange: onSelectChange,
		},
		{
			clickType: SelectClickTypes.ButtonClick,
		}
	);

	const handleUpdate = (value: string, id: string, property: string) => {
		setRows((rows: Row[]) =>
			rows.map((row: Row) => (row.id === id ? { ...row, [property]: value } : row))
		);
	};

	const addRow = () => {
		const newRow: Row = {
			id: uuidv4(),
		};

		columns.slice(1).forEach((column: Column) => {
			newRow[column.label] = "";
		});

		setRows((prevRows: Row[]) => [...prevRows, newRow]);
	};

	const addColumn = () => {
		const label: string | null = prompt("Enter the column label:");
		if (!label) {
			alert("Column label is required.");
			return;
		}

		const id: string = uuidv4();
		const renderCell = (row: Row) => (
			<input
				type="text"
				value={row[id] || ""}
				onChange={(event) => handleUpdate(event.target.value, row.id, id)}
				className="w-full"
			/>
		);

		const newColumn: Column = {
			id: id,
			label,
			renderCell,
		};

		setRows((prevRows: Row[]) =>
			prevRows.map((row: Row) => ({
				...row,
				[id]: "",
			}))
		);

		setColumns((prevCols: Column[]) => [...prevCols, newColumn]);
	};

	const logData = () => {
		console.log("rows:", rows);
		console.log("columns.length: ", columns.length);
	};

	return (
		<div>
			<div className="m-1">
				<button className="bg-red-500 m-1" onClick={addRow}>
					Add Row
				</button>
				<button className="bg-green-500 m-1" onClick={addColumn}>
					Add Column
				</button>
				<button className="bg-blue-500 m-1" onClick={logData}>
					Log Data
				</button>
			</div>
			<div
				className="bg-white p-1.5 rounded accent-blue-700"
				style={{ visibility: columns.length > 0 ? "visible" : "hidden" }}
			>
				<div className="overflow-x-auto">
					<Table
						data={data}
						theme={theme}
						layout={{ custom: true }}
						select={select}
						className="table"
					>
						{(tableList: any) => (
							<>
								<Header>
									<HeaderRow className="header-row">
										<HeaderCellSelect className="header-cell" />
										{columns.map((column: Column) => (
											<HeaderCell key={column.id} className="header-cell">
												{column.label}
											</HeaderCell>
										))}
									</HeaderRow>
								</Header>
								<Body>
									{tableList.map((row: Row) => (
										<Row item={row} key={row.id} className="row">
											<CellSelect item={row} />
											{columns.map((column: Column) => (
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
				</div>
			</div>
		</div>
	);
};

export default ListTable;
