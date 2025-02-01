import type { ModalProps } from "../types/ModalProps";
import modalPropsDefault from "../configs/modalPropsDefault";
import ModalContentInput from "./ModalContentInput";
// import ModalContentText from "./ModalContentText";
import Modal from "./Modal";

import { sortObjectsByProp } from "../utils/sortUtils";
import { formatToLocalDate } from "../utils/dateUtils";

import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

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

import {
	Add,
	Remove,
	ContentCopy,
	SwapHoriz,
	ArrowDownward,
	Search,
} from "@mui/icons-material";

interface Column {
	id: number;
	label: string;
	renderCell: (row: Row) => string;
}

interface Row {
	id: string;
	label: string;
	directory_label: string;
	created: string;
	modified: string;
}

const HomeTable = () => {
	const [columns] = useState<Column[]>([
		{
			id: 0,
			label: "Name",
			renderCell: (row: Row) => row.label,
		},
		{
			id: 1,
			label: "Directory",
			renderCell: (row: Row) => row.directory_label,
		},
		{
			id: 2,
			label: "Created",
			renderCell: (row: Row) => row.created,
		},
		{
			id: 3,
			label: "Modified",
			renderCell: (row: Row) => row.modified,
		},
	]);

	const [rows, setRows] = useState<Row[]>([]);

	useEffect(() => {
		const fetchLists = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/lists/`
			);
			const json = await response.json();

			if (response.ok) {
				setRows(
					json.map((row: Row) => ({
						...row,
						created: formatToLocalDate(row.created),
						modified: formatToLocalDate(row.modified),
					}))
				);
			}
		};

		fetchLists();
	}, []);

	const theme = useTheme([
		getTheme(),
		{
			Table: `
			--data-table-library_grid-template-columns: 38px calc(50% - 38px) repeat(3, calc(50% / 3));
			&.table {
				min-width: calc(38px + 375px - 38px + 3 * 125px);
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
					background-color: #EFF6FF;
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

	const labelRef = useRef<string>("");

	const [modalProps, setModalProps] = useState<ModalProps>(modalPropsDefault);

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setModalProps({
			show: true,
			title: "Add List",
			content: (
				<ModalContentInput
					placeholder="Enter list label"
					onChange={(e) => (labelRef.current = e.target.value)}
				/>
			),
			action: "Add",
			onAction: async () => {
				const list = { label: labelRef.current };

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/lists/`,
					{
						method: "POST",
						body: JSON.stringify(list),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const json = await response.json();

				if (response.ok) {
					setRows((prev) =>
						[
							...prev,
							{
								id: json.id,
								label: json.label,
								directory_label: json.directory_label,
								created: formatToLocalDate(json.created),
								modified: formatToLocalDate(json.modified),
							},
						].sort(sortObjectsByProp("label"))
					);

					setModalProps(modalPropsDefault);
					labelRef.current = "";
				} else {
					setModalProps((prev) => ({
						...prev,
						content: (
							<ModalContentInput
								placeholder="Enter list label"
								error={json.error}
								onChange={(e) => (labelRef.current = e.target.value)}
							/>
						),
					}));
				}
			},
			onCancel: () => {
				setModalProps(modalPropsDefault);
				labelRef.current = "";
			},
		});
	};

	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-row h-9 mb-6">
					<label
						htmlFor="search"
						className="w-1/2 p-1.5 rounded-full flex flex-row bg-white border border-line"
					>
						<div className="flex justify-center items-center w-[38px]">
							<Search />
						</div>
						<input
							id="search"
							type="text"
							value={search}
							onChange={handleSearch}
							className="h-full w-[calc(100%-38px)] focus:outline-none px-3"
						/>
					</label>
					<div className="w-1/2 flex flex-row justify-end">
						<button
							className="add-button button aspect-[1/1] mr-1.5"
							onClick={(e) => {
								handleAdd(e);
							}}
						>
							<Add />
						</button>
						<Tooltip anchorSelect=".add-button" place="top">
							Add
						</Tooltip>
						<button className="remove-button button aspect-[1/1] mx-1.5">
							<Remove />
						</button>
						<Tooltip anchorSelect=".remove-button" place="top">
							Delete
						</Tooltip>
						<button className="copy-button button aspect-[1/1] mx-1.5">
							<ContentCopy />
						</button>
						<Tooltip anchorSelect=".copy-button" place="top">
							Copy
						</Tooltip>
						<button className="swap-button button aspect-[1/1] mx-1.5">
							<SwapHoriz />
						</button>
						<Tooltip anchorSelect=".swap-button" place="top">
							Move
						</Tooltip>
						<button className="down-button button aspect-[1/1] ml-1.5">
							<ArrowDownward />
						</button>
						<Tooltip anchorSelect=".down-button" place="top">
							Export
						</Tooltip>
					</div>
				</div>
				<div className="bg-white p-1.5 rounded accent-blue-700 border border-line">
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
						{data.nodes.length === 0 ? (
							<div className="flex justify-center items-center h-9">
								<p>No lists</p>
							</div>
						) : null}
					</div>
				</div>
			</div>

			<Modal
				show={modalProps.show}
				title={modalProps.title}
				content={modalProps.content}
				action={modalProps.action}
				onAction={modalProps.onAction}
				onCancel={modalProps.onCancel}
			/>
		</>
	);
};

export default HomeTable;
