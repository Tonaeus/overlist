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

import useAuthContext from "../hooks/useAuthContext";

import { nanoid } from "nanoid";

import { Tooltip } from "react-tooltip";
import { MoreHoriz, Edit } from "@mui/icons-material";

import { BACKEND_URL } from "../configs/dotenvConfig";

const ListTable = () => {
	const { id } = useParams();

	const { isEditing } = useEditingContext();

	const {
		state: { listColumns },
	} = useListColumnsContext();

	const {
		state: { user },
	} = useAuthContext();

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
			hide: false,
		});

		if (listColumns) {
			const newColumns = [
				...listColumns.map(createColumn),
				...Array(Math.max(0, columns.length - listColumns.length)).fill({
					id: nanoid(),
					label: "",
					renderCell: () => <span></span>,
					hide: true,
				}),
			];

			setColumns(newColumns);
		}
	}, [listColumns]);

	useEffect(() => {
		const fetchListRows = async () => {
			const response = await fetch(`${BACKEND_URL}/api/list-rows/${id}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const json = await response.json();

			if (response.ok) {
				setRows(json);
				setOrgRows(json);
			}
		};

		if (user && columns.length > 0) {
			fetchListRows();
		}
	}, [id, columns, user]);

	const { data, theme, select } = useListTableComponent({
		rows,
		tableStyles: {
			Table: `
				min-width: calc(38px + 125px * ${columns.length});
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
					${rows.length > 0 ? "background-color: #F4F5F6" : ""};
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

	const [showName, setShowName] = useState(true);

	return (
		<>
			<div className="flex flex-col">
				<div className="flex justify-between h-9 mb-6 overflow-hidden">
					<div className="flex sm:hidden w-full">
						{showName && <ListTableName />}
						{!showName && <ListTableControls columns={columns} rows={rows} setRows={setRows} select={select} />}
					</div>

					<div className="hidden sm:flex sm:justify-between w-full">
						<ListTableName />
						<ListTableControls columns={columns} rows={rows} setRows={setRows} select={select} />
					</div>

					<button
						className="tool-button button aspect-[1/1] ml-3 sm:hidden"
						onClick={() => setShowName(!showName)}
					>
						{showName ? <MoreHoriz /> : <Edit />}
					</button>
					<Tooltip anchorSelect=".tool-button" place="top" className="z-10">
						{showName ? "Options" : "Name"}
					</Tooltip>
				</div>

				<ListTableComponent
					columns={columns}
					data={data}
					theme={theme}
					select={select}
				/>
			</div>

			<BlockerComponent
				shouldBlock={isEditing && !areArraysEqual(orgRows, rows)}
			/>
		</>
	);
};

export default ListTable;
