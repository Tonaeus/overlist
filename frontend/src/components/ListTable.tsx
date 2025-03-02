// import type { HomeTableColumn, HomeTableRow } from "../types/HomeTable";

import { useState } from "react";
// import { Link } from "react-router-dom";

import ListTableComponent from "../libs/ListTableComponent";

// import { formatToLocalDate } from "../utils/dateUtils";

import useListColumnsContext from "../hooks/useListColumnsContext";
import useTableComponent from "../hooks/useTableComponent";

import ListTableName from "./ListTableName";

// type Column = {
// 	id: string;
// 	label: string;
// 	renderCell: (row: Row) => JSX.Element;
// }

// type Row = {
// 	id: string;
// 	[key: string]: string;
// }

const ListTable = () => {
	// const [columns, setColumns] = useState<Column[]>([
	// 	{
	// 		id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
	// 		label: "text",
	// 		renderCell: (item: Row) => (
	// 			<input
	// 				type="text"
	// 				value={item["4e3b468c-7fa8-47d8-90a8-741bbea731ac"] || ""}
	// 				onChange={(event) =>
	// 					handleUpdate(event.target.value, item.id, "4e3b468c-7fa8-47d8-90a8-741bbea731ac")
	// 				}
	// 				className="w-full"
	// 			/>
	// 		),
	// 	},
	// ]);

	// const [rows, setRows] = useState<Row[]>([
	// 	{
	// 		"id": uuidv4(),
	// 		"4e3b468c-7fa8-47d8-90a8-741bbea731ac": "alpha",
	// 	},
	// ]);

	const {
		state: { listColumns: columns },
	} = useListColumnsContext();
	
	// const [columns, setColumns] = useState([]);
	const [rows] = useState([]);

	const { data, theme, select } = useTableComponent({
		rows,
		tableStyles: {
			Table: `
				min-width: calc(38px + 125px * ${columns.length > 0 ? columns.length : 1});
			`,
			BaseCell: `
				&:nth-of-type(1) {
					width: 38px;
        }
				&:not(:nth-of-type(1)) {
					width: 1fr;
					min-width: 125px;
				}
			`,
		},
	});

	// useEffect(() => {
	// 	// console.log("columns.length", columns.length);
	// }, [listColumns]); 

	// const handleUpdate = (value: string, id: string, property: string) => {
	// 	setRows((prevRows: Row[]) =>
	// 		prevRows.map((row: Row) => (row.id === id ? { ...row, [property]: value } : row))
	// 	);
	// };

	// const addRow = () => {
	// 	const newRow: Row = {
	// 		id: uuidv4(),
	// 	};

	// 	columns.slice(1).forEach((column: Column) => {
	// 		newRow[column.label] = "";
	// 	});

	// 	setRows((prevRows: Row[]) => [...prevRows, newRow]);
	// };

	// const addColumn = () => {
	// 	const label: string | null = prompt("Enter the column label:");
	// 	if (!label) {
	// 		alert("Column label is required.");
	// 		return;
	// 	}

	// 	const id: string = uuidv4();
	// 	const renderCell = (row: Row) => (
	// 		<input
	// 			type="text"
	// 			value={row[id] || ""}
	// 			onChange={(event) => handleUpdate(event.target.value, row.id, id)}
	// 			className="w-full"
	// 		/>
	// 	);

	// 	const newColumn: Column = {
	// 		id: id,
	// 		label,
	// 		renderCell,
	// 	};

	// 	setRows((prevRows: Row[]) =>
	// 		prevRows.map((row: Row) => ({
	// 			...row,
	// 			[id]: "",
	// 		}))
	// 	);

	// 	setColumns((prevCols: Column[]) => [...prevCols, newColumn]);
	// };

	return (
		<div className="flex flex-col">
			<div className="flex flex-row h-9 mb-6 bg-red-500">
				<ListTableName/>
			</div>

			<ListTableComponent
				columns={columns.length > 0 ? columns : [{}]}
				data={data}
				theme={theme}
				select={select}
				emptyMessage="No rows"
			/>
		</div>
	);
};

export default ListTable;
