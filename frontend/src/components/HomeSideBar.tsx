import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

interface Directory {
	id: string;
	label: string;
}

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentInput from "./ModalContentInput";
import ModalContentText from "./ModalContentText";

import { sortObjectsByProp } from "../utils/sortUtils";

const HomeSideBar = () => {
	const { id } = useParams();

	const [directories, setDirectories] = useState<Directory[]>([]);

	useEffect(() => {
		const fetchDirectories = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/directories/`
			);
			const json = await response.json();

			if (response.ok) {
				setDirectories(json);
			}
		};

		fetchDirectories();
	}, []);

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
					setDirectories((prev) =>
						[...prev, { id: json.id, label: json.label }].sort(
							sortObjectsByProp("label")
						)
					);
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
			onCancel: () => {
				hideModal();
			},
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
				const updatedDirectory = { label: getModalValue() };

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/directories/${directory.id}`,
					{
						method: "PATCH",
						body: JSON.stringify(updatedDirectory),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const json = await response.json();

				if (response.ok) {
					setDirectories((prev) =>
						[
							...prev.map((dir) =>
								dir.id === json.id ? { ...dir, label: json.label } : dir
							),
						].sort(sortObjectsByProp("label"))
					);
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
			onCancel: () => {
				hideModal();
			},
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
					setDirectories((prev) => prev.filter((dir) => dir.id !== json.id));
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
			onCancel: () => {
				hideModal();
			},
		});
	};

	return (
		<>
			<div className="flex flex-col h-full">
				<button
					className="button w-full mb-6"
					onClick={(e) => {
						handleAdd(e);
					}}
				>
					Add Directory
				</button>
				<div className="flex-1 overflow-y-auto">
					{directories.map((directory: Directory) => (
						<Link
							key={directory.id}
							to={`/directory/${directory.id}`}
							className={`h-9 flex justify-start items-center px-3 py-1.5 rounded-full ${
								directory.id === id
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
