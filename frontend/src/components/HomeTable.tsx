import type { HomeTableColumn, HomeTableRow } from "../types/HomeTable";
import type { Directory } from "../types/Directory";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import HomeTableComponent from "../libs/HomeTableComponent";
import HomeTableSearchBar from "../libs/HomeTableSearchBar";
import HomeTableControls from "./HomeTableControls";

import { formatToLocalDate } from "../utils/dateUtils";

import useDirectoriesContext from "../hooks/useDirectoriesContext";
import useHomeTableComponent from "../hooks/useHomeTableComponent";

import useAuthContext from "../hooks/useAuthContext";

import { BACKEND_URL } from "../configs/dotenvConfig";

const HomeTable = () => {
	const { id } = useParams();

	const {
		state: { user },
	} = useAuthContext();

	const [columns] = useState<HomeTableColumn[]>([
		{
			id: 0,
			label: "Label",
			renderCell: (row: HomeTableRow) => (
				<Link to={`/list/${row.id}`}>{row.label}</Link>
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
				`${BACKEND_URL}/api/lists/`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
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

		if (user) {
			fetchLists();
		}
	}, [directories, user]);

	useEffect(() => {
		select.fns.onRemoveAll();
	}, [id]);

	const filteredRows = rows.filter((row: HomeTableRow) => {
		const directory = directories.find((dir: Directory) => dir.id === id);
		return directory ? row.directory_label === directory.label : false;
	});

	const { search, setSearch, data, theme, select, sort } =
		useHomeTableComponent({
			rows: id ? filteredRows : rows,
			tableStyles: {
				Table: `
			--data-table-library_grid-template-columns: 38px calc(50% - 38px) repeat(3, calc(50% / 3));
			
			min-width: calc(38px + 375px - 38px + 3 * 125px);
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
		<div className="flex flex-col">
			<div className="flex justify-between mb-6 flex-col-reverse h-[84px] sm:flex-row sm:h-9">
				<HomeTableSearchBar search={search} setSearch={setSearch} />
				<HomeTableControls rows={rows} setRows={setRows} select={select} />
			</div>

			<HomeTableComponent
				columns={columns}
				data={data}
				theme={theme}
				select={select}
				sort={sort}
			/>
		</div>
	);
};

export default HomeTable;
