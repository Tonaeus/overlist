import type { HomeTableRow } from "../types/HomeTable";
import type { ListTableColumn, ListTableRow } from "../types/ListTable";

import { Dispatch, SetStateAction } from "react";
import { Select } from "@table-library/react-table-library/types/select";
import { TableNode } from "@table-library/react-table-library/types/table";

import {
	Add,
	Remove,
	ContentCopy,
	SwapHoriz,
	ArrowDownward,
} from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentInput from "./ModalContentInput";
import ModalContentText from "./ModalContentText";
import ModalContentSelect from "./ModalContentSelect";

import { formatToLocalDate } from "../utils/dateUtils";

import useDirectoriesContext from "../hooks/useDirectoriesContext";
import useListTableDownload from "../libs/useListTableDownload";

type HomeTableControlsProps = {
	rows: HomeTableRow[];
	setRows: Dispatch<SetStateAction<HomeTableRow[]>>;
	select: Select<TableNode>;
};

type DownloadListTableInput = {
	label: string;
	columns: ListTableColumn[];
	rows: ListTableRow[];
};

const HomeTableControls = ({
	rows,
	setRows,
	select,
}: HomeTableControlsProps) => {
	const {
		state: { directories },
	} = useDirectoriesContext();

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
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/lists/`,
					{
						method: "POST",
						body: JSON.stringify({ label: getModalValue() }),
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
						]
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

		const selectedLabels = rows
			.map((row) => {
				const labelIndex = select.state.ids.indexOf(row.id);
				return labelIndex !== -1 ? row.label : null;
			})
			.filter((label) => label !== null);

		let message: string;
		if (selectedLabels.length === 1) {
			message = `Are you sure you want to copy the list "${selectedLabels[0]}"?`;
		} else if (selectedLabels.length === 2) {
			message = `Are you sure you want to copy the following lists: "${selectedLabels[0]}" and "${selectedLabels[1]}"?`;
		} else {
			message = `Are you sure you want to copy the following lists: "${selectedLabels
				.slice(0, -1)
				.join('", "')}", and "${selectedLabels[selectedLabels.length - 1]}"?`;
		}

		showModal({
			title: `Copy ${select.state.ids.length.length === 1 ? "List" : "Lists"}`,
			content: <ModalContentText message={message} />,
			action: "Copy",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/lists/copy/`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ ids: select.state.ids }),
					}
				);

				const json = await response.json();

				if (response.ok) {
					setRows((prev) =>
						[
							...prev,
							...json.map((row: HomeTableRow) => ({
								...row,
								created: formatToLocalDate(row.created),
								modified: formatToLocalDate(row.modified),
							})),
						]
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

	const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const options = [
			{ value: "null", label: " " },
			...directories.map((dir) => ({
				value: dir.id,
				label: dir.label,
			})),
		];

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
							const item = json.find(
								(item: HomeTableRow) => item.id === row.id
							);
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

	const { DownloadListTable } = useListTableDownload();

	const handleExport = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const ids = select.state.ids.sort(
			(a: string, b: string) =>
				rows.findIndex((row: HomeTableRow) => row.id === a) -
				rows.findIndex((row: HomeTableRow) => row.id === b)
		);

		const inputs: DownloadListTableInput[] = [];

		for (const id of ids) {
			const label = rows.find((row: HomeTableRow) => row.id === id)?.label;

			const listColumnsResponse = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/list-columns/${id}`
			);
			const listColumns = await listColumnsResponse.json();

			const listRowsResponse = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`
			);
			const listRows = await listRowsResponse.json();

			if (label && listColumnsResponse.ok && listRowsResponse) {
				inputs.push({
					label: label,
					columns: listColumns,
					rows: listRows,
				});
			} else {
				return;
			}
		}

		for (const input of inputs) {
			DownloadListTable(input.label, input.columns, input.rows);
		}
	};

	return (
		<>
			<div className="w-1/2 flex flex-row justify-end">
				<button
					className="add-button button aspect-[1/1] mr-1.5"
					onClick={(e) => {
						handleAdd(e);
					}}
				>
					<Add />
				</button>
				<Tooltip anchorSelect=".add-button" place="top" className="z-10">
					Add
				</Tooltip>
				<button
					className="remove-button button aspect-[1/1] mx-1.5"
					onClick={(e) => {
						handleDelete(e);
					}}
					disabled={select.state.ids.length === 0}
				>
					<Remove />
				</button>
				<Tooltip anchorSelect=".remove-button" place="top" className="z-10">
					Delete
				</Tooltip>
				<button
					className="copy-button button aspect-[1/1] mx-1.5"
					onClick={(e) => {
						handleCopy(e);
					}}
					disabled={select.state.ids.length === 0}
				>
					<ContentCopy />
				</button>
				<Tooltip anchorSelect=".copy-button" place="top" className="z-10">
					Copy
				</Tooltip>
				<button
					className="swap-button button aspect-[1/1] mx-1.5"
					onClick={(e) => {
						handleMove(e);
					}}
					disabled={select.state.ids.length === 0}
				>
					<SwapHoriz />
				</button>
				<Tooltip anchorSelect=".swap-button" place="top" className="z-10">
					Move
				</Tooltip>
				<button
					className="down-button button aspect-[1/1] ml-1.5"
					onClick={(e) => {
						handleExport(e);
					}}
					disabled={select.state.ids.length === 0}
				>
					<ArrowDownward />
				</button>
				<Tooltip anchorSelect=".down-button" place="top" className="z-10">
					Export
				</Tooltip>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default HomeTableControls;
