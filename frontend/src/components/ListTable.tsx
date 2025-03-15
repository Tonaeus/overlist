import type { ListTableColumn, ListTableRow } from "../types/ListTable";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListTableComponent from "../libs/ListTableComponent";
import ListTableControls from "./ListTableControls";

import useListColumnsContext from "../hooks/useListColumnsContext";
import useListTableComponent from "../hooks/useListTableComponent";

import ListTableName from "./ListTableName";

import useEditingContext from "../hooks/useEditingContext";

import BlockerComponent from "./BlockerComponent";
import { areArraysEqual } from "../utils/compUtils";

const ListTable = () => {
	const { id } = useParams();

	const { isEditing} = useEditingContext();

	const {
		state: { listColumns },
	} = useListColumnsContext();

	const [columns, setColumns] = useState<ListTableColumn[]>([]);
	const [rows, setRows] = useState<ListTableRow[]>([]);

	const [orgRows, setOrgRows] = useState<ListTableRow[]>([]);

	const handleUpdate = (value: string, rowId: string, columnId: string) => {
		setRows((prevRow: ListTableRow[]) =>
			prevRow.map((row: ListTableRow) =>
				row.id === rowId ? { ...row, [columnId]: value } : row
			)
		);
	};

	useEffect(() => {
		const createColumn = (column: any) => ({
			id: column.id,
			label: column.label,
			renderCell: (item: ListTableRow, isEditing: boolean) =>
				isEditing ? (
					<input
						type="text"
						value={item[column.id] || ""}
						onChange={(e) => handleUpdate(e.target.value, item.id, column.id)}
						className="w-full focus:outline-none"
					/>
				) : (
					<p className="truncate">{item[column.id]}</p>
				),
		});

		if (listColumns) {
			setColumns(listColumns.map(createColumn));
		}
	}, [listColumns]);

	useEffect(() => {
		const fetchListRows = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`
			);
			const json = await response.json();

			if (response.ok) {
				setRows(json);
				setOrgRows(json);
			}
		};

		if (columns.length > 0) {
			fetchListRows();
		}
	}, [id, columns]);

	const { data, theme, select } = useListTableComponent({
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
					${isEditing ? "" : "background-color: #F4F5F6;"}
				}
				&.row-select-selected {
					background-color: #EFF6FF;
					font-weight: normal;
				}
			`,
			Cell: `
				&.cell {
				}
				&.cell:hover {
				}
				&:nth-of-type(1) {
					width: 38px;
				}
			`,
		},
	});

	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-row h-9 mb-6">
					<ListTableName />
					<ListTableControls columns={columns} rows={rows} setRows={setRows} select={select} />
				</div>

				<ListTableComponent
					columns={columns.length > 0 ? columns : [{}]}
					data={data}
					theme={theme}
					select={select}
					emptyMessage="No rows"
				/>
			</div>

			<BlockerComponent shouldBlock={isEditing && !areArraysEqual(orgRows, rows)} />
		</>
	);
};

export default ListTable;
