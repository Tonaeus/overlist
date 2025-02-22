import type { ListColumn } from "../types/ListColumn";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useListColumnsContext from "../hooks/useListColumnsContext";

import SideBarButton from "./SideBarButton";
import SideBarBlock from "./SideBarBlock";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentInput from "./ModalContentInput";
// import ModalContentText from "./ModalContentText";

const ListSideBar = () => {
	const { label } = useParams();

	const {
		state: { listColumns },
		dispatch,
	} = useListColumnsContext();

	useEffect(() => {
		const fetchListColumns = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/list-columns/${label}`
			);
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_LIST_COLUMNS", payload: json });
			}
		};

		fetchListColumns();
	}, [label, dispatch]);

	const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
		useModal();

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		showModal({
			title: "Add Column",
			content: (
				<ModalContentInput
					placeholder="Enter column label"
					onChange={(e) => setModalValue(e.target.value)}
				/>
			),
			action: "Add",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/list-columns/${label}`,
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
					dispatch({ type: "SET_LIST_COLUMNS", payload: json });
					hideModal();
				} else {
					showModal({
						content: (
							<ModalContentInput
								placeholder="Enter column label"
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

	const handleEdit = (
		e: React.MouseEvent<HTMLButtonElement>,
		listColumn: ListColumn
	) => {
		e.preventDefault();

		console.log(listColumn);
	};

	const handleDelete = (
		e: React.MouseEvent<HTMLButtonElement>,
		listColumn: ListColumn
	) => {
		e.preventDefault();

		console.log(listColumn);
	};

	return (
		<>
			<div className="flex flex-col h-full">
				<SideBarButton
					label="Add Column"
					onClick={(e) => {
						handleAdd(e);
					}}
				/>
				<div className="flex-1 overflow-y-auto">
					{listColumns.map((column: ListColumn) => (
						<SideBarBlock
							key={column.id}
							object={column}
							label={label}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					))}
				</div>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default ListSideBar;
