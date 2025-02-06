import { useEffect, useState } from "react";
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

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentInput from "./ModalContentInput";
import ModalContentText from "./ModalContentText";
import ModalContentSelect from "./ModalContentSelect";

import { sortObjectsByProp } from "../utils/sortUtils";
import { formatToLocalDate } from "../utils/dateUtils";
import useDirectoriesContext from "../hooks/useDirectoriesContext";

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
			label: "Label",
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

	const [search, setSearch] = useState<string>("");

	const handleSearch = (event: any) => {
		setSearch(event.target.value);
	};

	const data = {
		nodes: rows.filter((item) =>
			item.label.toLowerCase().includes(search.toLowerCase())
		),
	};

	const select = useRowSelect(
		data,
		{
			onChange: undefined,
		},
		{
			clickType: SelectClickTypes.ButtonClick,
		}
	);

	const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
		useModal();

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		showModal({
			title: "Add List",
			content: (
				<ModalContentInput
					placeholder="Enter list label"
					onChange={(e) => setModalValue(e.target.value)}
				/>
			),
			action: "Add",
			onAction: async () => {
				const list = { label: getModalValue() };

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
					hideModal();
				} else {
					showModal({
						content: (
							<ModalContentInput
								placeholder="Enter list label"
								error={json.error}
								onChange={(e) => setModalValue(e.target.value)}
							/>
						),
					});
				}
			},
			onCancel: () => hideModal(),
		});
	};

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const selectedLabels = rows
			.map((row) => {
				const labelIndex = select.state.ids.indexOf(row.id);
				return labelIndex !== -1 ? row.label : null;
			})
			.filter((label) => label !== null);

		let message: string;
		if (selectedLabels.length === 1) {
			message = `Are you sure you want to delete the list "${selectedLabels[0]}"?`;
		} else if (selectedLabels.length === 2) {
			message = `Are you sure you want to delete the following lists: "${selectedLabels[0]}" and "${selectedLabels[1]}"?`;
		} else {
			message = `Are you sure you want to delete the following lists: "${selectedLabels
				.slice(0, -1)
				.join('", "')}", and "${selectedLabels[selectedLabels.length - 1]}"?`;
		}

		showModal({
			title: `Delete ${
				select.state.ids.length.length === 1 ? "List" : "Lists"
			}`,
			content: <ModalContentText message={message} />,
			action: "Delete",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/lists/`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ ids: select.state.ids }),
					}
				);

				const json = await response.json();

				if (response.ok) {
					setRows((prev) =>
						prev.filter((row) => !select.state.ids.includes(row.id))
					);
					hideModal();
					select.fns.onRemoveAll();
				} else {
					showModal({
						content: <ModalContentText message={message} error={json.error} />,
					});
				}
			},
			onCancel: () => hideModal(),
		});
	};

	const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("copy");
	};

	const {
		state: { directories },
	} = useDirectoriesContext();

	const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const options = directories.map((dir) => ({
			value: dir.id,
			label: dir.label,
		}));

		showModal({
			show: true,
			title: `Move ${select.state.ids.length === 1 ? "List" : "Lists"}`,
			content: (
				<ModalContentSelect
					placeholder="Select a directory"
					options={options}
					onChange={(value: string) => setModalValue(value)}
				/>
			),
			action: "Move",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/lists/`,
					{
						method: "PATCH",
						headers: {
							"Content-type": "application/json"
						},
						body: JSON.stringify({
							ids: select.state.ids,
							directory_id: getModalValue(),
						})
					}
				)

				const json = await response.json();

				if (response.ok) {
					console.log(json);
				} else {
					showModal({
						content: (
							<ModalContentSelect
								placeholder="Select a directory"
								options={options}
								error={json.error}
								onChange={(value: string) => setModalValue(value)}
							/>
						),
					});
				}
			},
			onCancel: () => hideModal(),
		});
	};

	const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log("export");
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
						<button
							className="remove-button button aspect-[1/1] mx-1.5"
							onClick={(e) => {
								handleDelete(e);
							}}
							disabled={select.state.ids.length === 0 ? true : false}
						>
							<Remove />
						</button>
						<Tooltip anchorSelect=".remove-button" place="top">
							Delete
						</Tooltip>
						<button
							className="copy-button button aspect-[1/1] mx-1.5"
							onClick={(e) => {
								handleCopy(e);
							}}
							disabled={select.state.ids.length === 0 ? true : false}
						>
							<ContentCopy />
						</button>
						<Tooltip anchorSelect=".copy-button" place="top">
							Copy
						</Tooltip>
						<button
							className="swap-button button aspect-[1/1] mx-1.5"
							onClick={(e) => {
								handleMove(e);
							}}
							disabled={select.state.ids.length === 0 ? true : false}
						>
							<SwapHoriz />
						</button>
						<Tooltip anchorSelect=".swap-button" place="top">
							Move
						</Tooltip>
						<button
							className="down-button button aspect-[1/1] ml-1.5"
							onClick={(e) => {
								handleExport(e);
							}}
							disabled={select.state.ids.length === 0 ? true : false}
						>
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

			<Modal {...modalProps} />
		</>
	);
};

export default HomeTable;
