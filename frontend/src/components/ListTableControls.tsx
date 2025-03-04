import type { ListTableRow } from "../types/ListTable";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@table-library/react-table-library/types/select";
import { TableNode } from "@table-library/react-table-library/types/table";

import { useParams } from "react-router-dom";

import {
	Add,
	// Remove,
	// ContentCopy,
	// SwapHoriz,
	// ArrowDownward,
} from "@mui/icons-material";
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
	console.log(setRows);
	console.log(select);

  const { id } = useParams();

	// const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
	// 	useModal();

	const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		console.log("add");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/list-rows/${id}`,
      {
        method: "POST",
      }
    );

    const json = await response.json();

    console.log(json);
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
				{/* <button
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
        className="swap-button button aspect-[1/1] mx-1.5"
        onClick={(e) => {
          handleMove(e);
        }}
        disabled={select.state.ids.length === 0}
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
        disabled={select.state.ids.length === 0}
      >
        <ArrowDownward />
      </button>
      <Tooltip anchorSelect=".down-button" place="top">
        Export
      </Tooltip> */}
			</div>

			{/* <Modal {...modalProps} /> */}
		</>
	);
};

export default ListTableControls;
