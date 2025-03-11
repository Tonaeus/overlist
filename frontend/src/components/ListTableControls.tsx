import type { ListTableRow } from "../types/ListTable";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@table-library/react-table-library/types/select";
import { TableNode } from "@table-library/react-table-library/types/table";

import { useParams } from "react-router-dom";

import { Add, Remove, ContentCopy, Undo, Sync, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentText from "./ModalContentText";
import useEditingContext from "../hooks/useEditingContext";

type ListTableControlsProps = {
	rows: ListTableRow[];
	setRows: Dispatch<SetStateAction<ListTableRow[]>>;
	select: Select<TableNode>;
};

const ListTableControls = ({
	rows,
	setRows,
	select,
}: ListTableControlsProps) => {
	const { id } = useParams();

	const {isEditing, startEditing, stopEditing} = useEditingContext();

	const { modalProps, showModal, hideModal } = useModal();

	const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`,
			{
				method: "POST",
			}
		);

		const json = await response.json();

		if (response.ok) {
			setRows((prev) => [...prev, json]);
		}
	};

	const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const selectedPositions = rows
			.map((row, index) =>
				select.state.ids.includes(row.id) ? index + 1 : null
			)
			.filter((position) => position !== null);

		let message: string;
		if (selectedPositions.length === 1) {
			message = `Are you sure you want to delete the row at index ${selectedPositions[0]}?`;
		} else if (selectedPositions.length === 2) {
			message = `Are you sure you want to delete the following rows at indices: ${selectedPositions[0]} and ${selectedPositions[1]}?`;
		} else {
			message = `Are you sure you want to delete the following rows at indices: ${selectedPositions
				.slice(0, -1)
				.join(", ")}, and ${selectedPositions[selectedPositions.length - 1]}?`;
		}

		showModal({
			title: `Delete ${select.state.ids.length.length === 1 ? "Row" : "Rows"}`,
			content: <ModalContentText message={message} />,
			action: "Delete",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`,
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

	const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const selectedPositions = rows
			.map((row, index) =>
				select.state.ids.includes(row.id) ? index + 1 : null
			)
			.filter((position) => position !== null);

		let message: string;
		if (selectedPositions.length === 1) {
			message = `Are you sure you want to copy the row at index ${selectedPositions[0]}?`;
		} else if (selectedPositions.length === 2) {
			message = `Are you sure you want to copy the following rows at indices: ${selectedPositions[0]} and ${selectedPositions[1]}?`;
		} else {
			message = `Are you sure you want to copy the following rows at indices: ${selectedPositions
				.slice(0, -1)
				.join(", ")}, and ${selectedPositions[selectedPositions.length - 1]}?`;
		}

		showModal({
			title: `Copy ${select.state.ids.length.length === 1 ? "Row" : "Rows"}`,
			content: <ModalContentText message={message} />,
			action: "Copy",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/copy/${id}`,
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
					setRows((prev) => prev.concat(json));
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

	const handleReset = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const selectedPositions = rows
			.map((row, index) =>
				select.state.ids.includes(row.id) ? index + 1 : null
			)
			.filter((position) => position !== null);

		let message: string;
		if (selectedPositions.length === 1) {
			message = `Are you sure you want to reset the row at index ${selectedPositions[0]}?`;
		} else if (selectedPositions.length === 2) {
			message = `Are you sure you want to reset the following rows at indices: ${selectedPositions[0]} and ${selectedPositions[1]}?`;
		} else {
			message = `Are you sure you want to reest the following rows at indices: ${selectedPositions
				.slice(0, -1)
				.join(", ")}, and ${selectedPositions[selectedPositions.length - 1]}?`;
		}

		showModal({
			title: `Reset ${select.state.ids.length.length === 1 ? "Row" : "Rows"}`,
			content: <ModalContentText message={message} />,
			action: "Reset",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/reset/${id}`,
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
					setRows((prev) => prev.map((row: any) =>
						select.state.ids.includes(row.id)
							? Object.fromEntries(Object.entries(row).map(([key, value]) => [key, key === 'id' ? value : '']))
							: row
					));
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

	const handleSync = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		select.fns.onRemoveAll();

		console.log("handleSync", isEditing);
		console.log("select", select.fns);

		if (!isEditing) {
			startEditing();
		}
		else {
			stopEditing();
		}

		// const response = await fetch(
		// 	`${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`,
		// 	{
		// 		method: "PATCH",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ rows }),
		// 	}
		// );

		// const json = await response.json();

		// if (response.ok) {
		// 	console.log("success", json);
		// }
	};

	return (
		<>
			<div className="w-1/2 flex flex-row justify-end">
				<button
					className="add-button button aspect-[1/1] mr-1.5"
					onClick={(e) => {
						handleAdd(e);
					}}
					disabled={isEditing}
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
					disabled={select.state.ids.length === 0 || isEditing}
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
					disabled={select.state.ids.length === 0 || isEditing}
				>
					<ContentCopy />
				</button>
				<Tooltip anchorSelect=".copy-button" place="top" className="z-10">
					Copy
				</Tooltip>
				<button
					className="undo-button button aspect-[1/1] mx-1.5"
					onClick={(e) => {
						handleReset(e);
					}}
					disabled={select.state.ids.length === 0 || isEditing}
				>
					<Undo />
				</button>
				<Tooltip anchorSelect=".undo-button" place="top" className="z-10">
					Reset
				</Tooltip>
				<button
					className="sync-button button aspect-[1/1] ml-1.5"
					onClick={(e) => {
						handleSync(e);
					}}
					disabled={false}
				>
					{isEditing ? <Sync /> : <Edit/>}
				</button>
				<Tooltip anchorSelect=".sync-button" place="top" className="z-10">
					{isEditing ? "Save" : "Edit"}
				</Tooltip>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default ListTableControls;
