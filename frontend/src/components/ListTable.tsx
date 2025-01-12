import React, { useState, useEffect } from "react";
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
	SelectTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

const ListTable = () => {
	const [rows, setRows] = useState([
		// {
		// 	"id": uuidv4(),
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731ac": "alpha",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731a1": "alpha",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73112": "alpha",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73123": "alpha",
		// },
		// {
		// 	"id": uuidv4(),
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731ac": "beta",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731a1": "beta",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73112": "beta",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73123": "beta",
		// },
		// {
		// 	id: uuidv4(),
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731ac": "gamma",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea731a1": "gamma",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73112": "gamma",
		// 	"4e3b468c-7fa8-47d8-90a8-741bbea73123": "gamma",
		// },
	]);

	const data = { nodes: rows };

	const onSelectChange = (action, state) => {
		// console.log("action: ", action);
		// console.log("state: ", state);
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

	const [columns, setColumns] = useState([
		// {
		// 	id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
		// 	label: "text",
		// 	renderCell: (item) => (
		// 		<input
		// 			type="text"
		// 			value={item["4e3b468c-7fa8-47d8-90a8-741bbea731ac"] || ""}
		// 			onChange={(event) =>
		// 				handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea731ac")
		// 			}
		// 			className="w-full"
		// 		/>
		// 	),
		// },
		// {
		// 	id: "4e3b468c-7fa8-47d8-90a8-741bbea731a1",
		// 	label: "text",
		// 	renderCell: (item) => (
		// 		<input
		// 			type="text"
		// 			value={item["4e3b468c-7fa8-47d8-90a8-741bbea731a1"] || ""}
		// 			onChange={(event) =>
		// 				handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea731a1")
		// 			}
		// 			className="w-full"
		// 		/>
		// 	),
		// },
		// {
		// 	id: "4e3b468c-7fa8-47d8-90a8-741bbea73112",
		// 	label: "text",
		// 	renderCell: (item) => (
		// 		<input
		// 			type="text"
		// 			value={item["4e3b468c-7fa8-47d8-90a8-741bbea73112"] || ""}
		// 			onChange={(event) =>
		// 				handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea73112")
		// 			}
		// 			className="w-full"
		// 		/>
		// 	),
		// },
		// {
		// 	id: "4e3b468c-7fa8-47d8-90a8-741bbea73123",
		// 	label: "text",
		// 	renderCell: (item) => (
		// 		<input
		// 			type="text"
		// 			value={item["4e3b468c-7fa8-47d8-90a8-741bbea73123"] || ""}
		// 			onChange={(event) =>
		// 				handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea73123")
		// 			}
		// 			className="w-full"
		// 		/>
		// 	),
		// },
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

	const handleUpdate = (value, id, property) => {
		setRows((state) =>
			state.map((row) => (row.id === id ? { ...row, [property]: value } : row))
		);
	};

	const addRow = () => {
		const newRow = {
			id: uuidv4(),
		};

		columns.slice(1).forEach((column) => {
			const columnLabel = column.label;
			newRow[columnLabel] = "";
		});

		setRows((prev) => [...prev, newRow]);
	};

	const addColumn = () => {
		const label = prompt("Enter the column label:");
		if (!label) {
			alert("Column label is required.");
			return;
		}

		const id = uuidv4();
		const renderCell = (item) => (
			<input
				type="text"
				value={item[id] || ""}
				onChange={(event) => handleUpdate(event.target.value, item.id, id)}
				className="w-full"
			/>
		);

		const newColumn = {
			id: id,
			label,
			renderCell,
		};

		setRows((prev) =>
			prev.map((row) => ({
				...row,
				[id]: "",
			}))
		);

		setColumns((prev) => [...prev, newColumn]);
	};

	const logData = () => {
		console.log("rows:", rows);
		console.log("columns.length: ", columns.length);
	};

	// const deleteRow = (id) => {
	// 	setRows((prev) => prev.filter((row) => row.id !== id));
	// };

	// const duplicateRow = (id) => {
	// 	const rowToDuplicate = rows.find((row) => row.id === id);
	// 	const duplicatedRow = { ...rowToDuplicate, id: uuidv4() };
	// 	setRows((prev) => [...prev, duplicatedRow]);
	// };

	// const resetRow = (id) => {
	// 	setRows((state) =>
	// 		state.map((row) =>
	// 			row.id === id
	// 				? Object.keys(row).reduce((acc, key) => {
	// 						if (key !== "id") {
	// 							acc[key] = "";
	// 						} else {
	// 							acc[key] = row[key];
	// 						}
	// 						return acc;
	// 				  }, {})
	// 				: row
	// 		)
	// 	);
	// };

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
						{(tableList) => (
							<>
								<Header>
									<HeaderRow className="header-row">
										<HeaderCellSelect className="header-cell" />
										{columns.map((column) => (
											<HeaderCell key={column.id} className="header-cell">
												{column.label}
											</HeaderCell>
										))}
									</HeaderRow>
								</Header>
								<Body>
									{tableList.map((item) => (
										<Row item={item} key={item.id} className="row">
											<CellSelect item={item} />
											{columns.map((column, index) => (
												<Cell key={column.id} className="cell">
													{column.renderCell(item)}
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
