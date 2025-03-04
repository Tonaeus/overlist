import type { ListTableRow } from "../types/ListTable";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@table-library/react-table-library/types/select";
import { TableNode } from "@table-library/react-table-library/types/table";

import { useParams } from "react-router-dom";

import { Add, Remove, ContentCopy, Undo, Sync } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

// import useModal from "../hooks/useModal";
// import Modal from "./Modal";
// import ModalContentInput from "./ModalContentInput";
// import ModalContentText from "./ModalContentText";
// import ModalContentSelect from "./ModalContentSelect";

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
	console.log(rows);
	console.log(select);

	const { id } = useParams();

	// const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
	// 	useModal();

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

		console.log("Delete");
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
					className="sync-button button aspect-[1/1] ml-1.5"
					onClick={(e) => {
						handleSync(e);
					}}
					disabled={true}
				>
					<Sync />
				</button>
				<Tooltip anchorSelect=".sync-button" place="top">
					Save
				</Tooltip>
			</div>

			{/* <Modal {...modalProps} /> */}
		</>
	);
};

export default ListTableControls;
