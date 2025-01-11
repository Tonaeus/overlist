import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { CompactTable } from "@table-library/react-table-library/compact";
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
	const theme = useTheme(getTheme());
	// const theme = useTheme([
	// 	getTheme(),
	// 	// {
	// 	// 	Row: `
	// 	// 		&.foo {
	// 	// 			background-color: pink;
	// 	// 		}
	// 	// 	`
	// 	// },
	// ]);

	const [rows, setRows] = useState([
		{
			id: uuidv4(),
			text: "alpha",
		},
		{
			id: uuidv4(),
			text: "beta",
		},
		{
			id: uuidv4(),
			text: "gamma",
		},
	]);

	const data = { nodes: rows };

	const onSelectChange = (action, state) => {
		// console.log("action: ", action);
		// console.log("state: ", state);
		console.log("ids: ", state.ids);
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
		{
			label: "id",
			renderCell: (item) => item.id,
			select: true,
		},
		{
			label: "text",
			renderCell: (item) => (
				<input
					type="text"
					value={item["text"] || ""}
					onChange={(event) =>
						handleUpdate(event.target.value, item.id, "text")
					}
					className="w-full"
				/>
			),
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

		const labelExists = columns.some((column) => column.label === label);
		if (labelExists) {
			alert(
				"This column label is already in use. Please choose a different label."
			);
			return;
		}

		const newProperty = `${label}`;
		const renderCell = (item) => (
			<input
				type="text"
				value={item[newProperty] || ""}
				onChange={(event) =>
					handleUpdate(event.target.value, item.id, newProperty)
				}
				className="w-full"
			/>
		);

		const newColumn = {
			label,
			renderCell,
		};

		setRows((prev) =>
			prev.map((row) => ({
				...row,
				[newProperty]: "",
			}))
		);

		setColumns((prev) => [...prev, newColumn]);
	};

	const logData = () => {
		console.log(rows);
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
			{/* <CompactTable 
        columns={columns} 
        data={ data }
        theme={theme} 
        select={select} 
      /> */}
			<Table data={data} theme={theme} select={select}>
				{(tableList) => (
					<>
						<Header>
							<HeaderRow>
								<HeaderCellSelect />
								{columns.map((column) => (
									<HeaderCell key={column.label}>{column.label}</HeaderCell>
								))}
							</HeaderRow>
						</Header>
						<Body>
							{tableList.map((item) => (
								<Row item={item} key={item.id}>
									<CellSelect item={item} />
									{columns.map((column, index) => (
										<Cell key={column.label}>{column.renderCell(item)}</Cell>
									))}
								</Row>
							))}
						</Body>
					</>
				)}
			</Table>
		</div>
	);
};

export default ListTable;
