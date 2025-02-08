import type { Directory } from "../types/Directory";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useDirectoriesContext from "../hooks/useDirectoriesContext";

import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import SideBarButton from "./SideBarButton";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentInput from "./ModalContentInput";
import ModalContentText from "./ModalContentText";

const HomeSideBar = () => {
	const { label } = useParams();

	const {
		state: { directories },
		dispatch,
	} = useDirectoriesContext();

	useEffect(() => {
		const fetchDirectories = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/directories/`
			);
			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_DIRECTORIES", payload: json });
			}
		};

		fetchDirectories();
	}, [dispatch]);

	const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
		useModal();

	const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		showModal({
			title: "Add Directory",
			content: (
				<ModalContentInput
					placeholder="Enter directory label"
					onChange={(e) => setModalValue(e.target.value)}
				/>
			),
			action: "Add",
			onAction: async () => {
				const directory = { label: getModalValue() };

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/directories/`,
					{
						method: "POST",
						body: JSON.stringify(directory),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "CREATE_DIRECTORY", payload: json });
					hideModal();
				} else {
					showModal({
						content: (
							<ModalContentInput
								placeholder="Enter directory label"
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
		directory: Directory
	) => {
		e.preventDefault();

		showModal({
			title: "Edit Directory",
			content: (
				<ModalContentInput
					placeholder="Enter directory label"
					onChange={(e) => setModalValue(e.target.value)}
				/>
			),
			action: "Edit",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/directories/${directory.id}`,
					{
						method: "PATCH",
						body: JSON.stringify({ label: getModalValue() }),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "UPDATE_DIRECTORY", payload: json });
					hideModal();
				} else {
					showModal({
						content: (
							<ModalContentInput
								placeholder="Enter directory label"
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

	const handleDelete = (
		e: React.MouseEvent<HTMLButtonElement>,
		directory: Directory
	) => {
		e.preventDefault();

		showModal({
			title: "Delete Directory",
			content: (
				<ModalContentText
					message={`Are you sure you want to delete the directory "${directory.label}"?`}
				/>
			),
			action: "Delete",
			onAction: async () => {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/directories/${directory.id}`,
					{
						method: "DELETE",
					}
				);

				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "DELETE_DIRECTORY", payload: json });
					hideModal();
				} else {
					showModal({
						content: (
							<ModalContentText
								message={`Are you sure you want to delete the directory "${directory.label}"?`}
								error={json.error}
							/>
						),
					});
				}
			},
			onCancel: () => hideModal(),
		});
	};

	return (
		<>
			<div className="flex flex-col h-full">
				<SideBarButton
					label="Add Directory"
					onClick={(e) => {
						handleAdd(e);
					}}
				/>
				<div className="flex-1 overflow-y-auto">
					{directories.map((directory: Directory) => (
						<Link
							key={directory.id}
							to={`/directory/${directory.label}`}
							className={`h-9 flex justify-start items-center px-3 py-1.5 rounded-full ${
								directory.label === label
									? "bg-selected text-blue-700"
									: "hover:bg-hovered"
							} group`}
						>
							<div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
								{directory.label}
							</div>
							<div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:pl-3">
								<button
									className="edit-button hover:scale-110"
									onClick={(e) => {
										handleEdit(e, directory);
									}}
								>
									<Edit />
								</button>
								<Tooltip anchorSelect=".edit-button" place="top">
									Edit
								</Tooltip>
								<button
									className="delete-button hover:scale-110"
									onClick={(e) => {
										handleDelete(e, directory);
									}}
								>
									<Delete />
								</button>
								<Tooltip anchorSelect=".delete-button" place="top">
									Delete
								</Tooltip>
							</div>
						</Link>
					))}
				</div>
			</div>

			<Modal {...modalProps} />
		</>
	);
};

export default HomeSideBar;
