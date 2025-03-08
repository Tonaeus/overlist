import type { ListTableRow } from "../types/ListTable";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@table-library/react-table-library/types/select";
import { TableNode } from "@table-library/react-table-library/types/table";

import { useParams } from "react-router-dom";

import { Add, Remove, ContentCopy, Undo, Sync } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentText from "./ModalContentText";

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
			message = `Are you sure you want to delete the row ${selectedPositions[0]}?`;
		} else if (selectedPositions.length === 2) {
			message = `Are you sure you want to delete the following rows: ${selectedPositions[0]} and ${selectedPositions[1]}?`;
		} else {
			message = `Are you sure you want to delete the following rows: ${selectedPositions
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

		console.log("Copy");
	};

	const handleUndo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		console.log("Undo");
	};

	const handleSync = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		console.log("Sync");
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
				<Tooltip anchorSelect=".add-button" place="top">
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
				<Tooltip anchorSelect=".remove-button" place="top">
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
				<Tooltip anchorSelect=".copy-button" place="top">
					Copy
				</Tooltip>
				<button
					className="undo-button button aspect-[1/1] mx-1.5"
					onClick={(e) => {
						handleUndo(e);
					}}
					disabled={select.state.ids.length === 0}
				>
					<Undo />
				</button>
				<Tooltip anchorSelect=".undo-button" place="top">
					Reset
				</Tooltip>
				<button
					className="sync-button button aspect-[1/1] ml-1.5 bg-red-500"
					onClick={(e) => {
						handleSync(e);
					}}
					disabled={false}
				>
					<Sync />
				</button>
				<Tooltip anchorSelect=".sync-button" place="top">
					Save
				</Tooltip>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default ListTableControls;
