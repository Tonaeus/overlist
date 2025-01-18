import { useState } from "react";

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
	label: string;
	renderCell: (row: Row) => string;
}

interface Row {
	id: string;
	label: string;
	directory: string;
	created: string;
	modified: string;
}

const HomeTable = () => {
	const [columns] = useState<Column[]>([
		{
			label: "Name",
			renderCell: (row: Row) => row.label,
		},
		{
			label: "Directory",
			renderCell: (row: Row) => row.directory,
		},
		{
			label: "Created",
			renderCell: (row: Row) => row.created,
		},
		{
			label: "Modified",
			renderCell: (row: Row) => row.modified,
		},
	]);

	const [rows] = useState<Row[]>([
		{
			id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
			label: "Name",
			directory: "None",
			created: "01/15/2025",
			modified: "01/15/2025",
		},
		{
			id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
			label: "alpha",
			directory: "None",
			created: "01/15/2025",
			modified: "01/15/2025",
		},
		{
			id: "4e3b468c-7fa8-47d8-90a8-741bbea731ac",
			label: "beta",
			directory: "None",
			created: "01/15/2025",
			modified: "01/15/2025",
		},
	]);

	const theme = useTheme([
		getTheme(),
		{
			Table: `
			--data-table-library_grid-template-columns: 38px calc(50% - 38px) repeat(3, calc(50% / 3));
			&.table {
				min-width: calc(38px + 450px - 38px + 3 * 150px);
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

	const [search, setSearch] = useState("");

	const handleSearch = (event: any) => {
		setSearch(event.target.value);
	};

	const data = {
		nodes: rows.filter((item) =>
			item.label.toLowerCase().includes(search.toLowerCase())
		),
	};

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

	return (
		<div className="flex flex-col">
			<div className="flex flex-row h-9 mb-6 bg-yellow-500">
				<label htmlFor="search" className="w-1/2 flex justify-center items-center accent-red-700 bg-green-500">
					<input
						id="search"
						type="text"
						value={search}
						onChange={handleSearch}
            className="w-full"
					/>
				</label>
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
											<HeaderCell key={column.label} className="header-cell">
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
												<Cell key={column.label} className="cell">
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

export default HomeTable;
