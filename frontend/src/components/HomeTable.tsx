import type { HomeTableColumn, HomeTableRow } from "../types/HomeTable";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TableComponent from "../libs/TableComponent";
import TableSearchComponent from "../libs/TableSearchComponent";
import HomeTableControls from "./HomeTableControls";

import { formatToLocalDate } from "../utils/dateUtils";

import useDirectoriesContext from "../hooks/useDirectoriesContext";
import useTableComponent from "../hooks/useTableComponent";

const HomeTable = () => {
	const [columns] = useState<HomeTableColumn[]>([
		{
			id: 0,
			label: "Label",
			renderCell: (row: HomeTableRow) => (
				<Link to={`/list/${row.label}`}>{row.label}</Link>
			),
		},
		{
			id: 1,
			label: "Directory",
			renderCell: (row: HomeTableRow) => row.directory_label,
		},
		{
			id: 2,
			label: "Created",
			renderCell: (row: HomeTableRow) => row.created,
		},
		{
			id: 3,
			label: "Modified",
			renderCell: (row: HomeTableRow) => row.modified,
		},
	]);

	const [rows, setRows] = useState<HomeTableRow[]>([]);

	const {
		state: { directories },
	} = useDirectoriesContext();

	useEffect(() => {
		const fetchLists = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/lists/`
			);
			const json = await response.json();

			if (response.ok) {
				setRows(
					json.map((row: HomeTableRow) => ({
						...row,
						created: formatToLocalDate(row.created),
						modified: formatToLocalDate(row.modified),
					}))
				);
			}
		};

		fetchLists();
	}, [directories]);

	const { search, setSearch, data, theme, select } = useTableComponent({
		rows,
		tableStyles: `
			--data-table-library_grid-template-columns: 
				38px 
				calc(50% - 38px) 
				repeat(3, calc(50% / 3));
	
			&.table {
				min-width: calc(38px + 375px - 38px + 3 * 125px);
			}
		`,
	});

	return (
		<div className="flex flex-col">
			<div className="flex flex-row h-9 mb-6">
				<TableSearchComponent search={search} setSearch={setSearch} />
				<HomeTableControls rows={rows} setRows={setRows} select={select} />
			</div>

			<TableComponent
				columns={columns}
				data={data}
				theme={theme}
				select={select}
			/>
		</div>
	);
};

export default HomeTable;
