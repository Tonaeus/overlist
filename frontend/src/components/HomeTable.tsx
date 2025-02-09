import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

import {
	SelectClickTypes,
	useRowSelect,
} from "@table-library/react-table-library/select";

import {
	Add,
	Remove,
	ContentCopy,
	SwapHoriz,
	ArrowDownward,
} from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import TableComponent from "../libs/TableComponent";
import TableSearchComponent from "../libs/TableSearchComponent";

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
	renderCell: (row: Row) => JSX.Element | string;
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
			renderCell: (row: Row) => (
				<Link to={`/list/${row.label}`}>{row.label}</Link>
			),
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
					json.map((row: Row) => ({
						...row,
						created: formatToLocalDate(row.created),
						modified: formatToLocalDate(row.modified),
					}))
				);
			}
		};

		fetchLists();
	}, [directories]);

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
								...json,
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
							"Content-type": "application/json",
						},
						body: JSON.stringify({
							ids: select.state.ids,
							directory_id: getModalValue(),
						}),
					}
				);

				const json = await response.json();

				if (response.ok) {
					setRows((prev) =>
						prev.map((row) => {
							const item = json.find((item: Row) => item.id === row.id);
							return item
								? {
										...item,
										created: formatToLocalDate(item.created),
										modified: formatToLocalDate(item.modified),
								  }
								: row;
						})
					);
					hideModal();
					select.fns.onRemoveAll();
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
					<TableSearchComponent search={search} setSearch={setSearch} />
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

				<TableComponent
					columns={columns}
					data={data}
					theme={theme}
					select={select}
				/>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default HomeTable;
