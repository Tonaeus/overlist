import type { ModalProps } from "../types/ModalProps";
import modalPropsDefault from "../configs/modalPropsDefault";
import ModalContentInput from "./ModalContentInput";
import ModalContentText from "./ModalContentText";
import Modal from "./Modal";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

interface Directory {
	id: string;
	label: string;
}

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

	const labelRef = useRef<string>("");

	const [modalProps, setModalProps] = useState<ModalProps>(modalPropsDefault);

	const handleAdd = () => {
		setModalProps({
			show: true,
			title: "Add Directory",
			content: (
				<ModalContentInput
					placeholder="Enter directory label"
					onChange={(e) => (labelRef.current = e.target.value)}
				/>
			),
			action: "Add",
			onAction: () => {
				const directoryLabel = labelRef.current.trim();
				if (directoryLabel) {
					setDirectories((prev) => [
						...prev,
						{ id: `${Date.now()}`, label: directoryLabel },
					]);
					setModalProps(modalPropsDefault);
					labelRef.current = "";
				} 
				else {
					setModalProps((prev) => ({
						...prev,
						content: (
							<ModalContentInput
								placeholder="Enter directory label"
								error="Directory label cannot be empty."
								onChange={(e) => (labelRef.current = e.target.value)}
							/>
						),
					}));
				}
			},
			onCancel: () => {
				setModalProps(modalPropsDefault);
				labelRef.current = "";
			},
		});
	};

	const handleEdit = (directoryId: string) => {
		const directory = directories.find((dir) => dir.id === directoryId);
		if (!directory) return;
	
		setModalProps({
			show: true,
			title: "Edit Directory",
			content: (
				<ModalContentInput
					placeholder="Enter directory label"
					onChange={(e) => (labelRef.current = e.target.value)}
				/>
			),
			action: "Edit",
			onAction: () => {
				const directoryLabel = labelRef.current.trim();
				if (directoryLabel) {
					setDirectories((prev) =>
						prev.map((dir) =>
							dir.id === directoryId ? { ...dir, label: directoryLabel } : dir
						)
					);
					setModalProps(modalPropsDefault);
					labelRef.current = "";
				} 
				else {
					setModalProps((prev) => ({
						...prev,
						content: (
							<ModalContentInput
								placeholder="Enter directory label"
								error="Directory label cannot be empty."
								onChange={(e) => (labelRef.current = e.target.value)}
							/>
						),
					}));
				}
			},
			onCancel: () => {
				setModalProps(modalPropsDefault);
				labelRef.current = "";
			},
		});
	};

	const handleDelete = (directoryId: string) => {
		const directory = directories.find((dir) => dir.id === directoryId);
		if (!directory) return;

		setModalProps({
			show: true,
			title: "Delete Directory",
			content: (
				<ModalContentText
					message={`Are you sure you want to delete the directory "${directory.label}"?`}
				/>
			),
			action: "Delete",
			onAction: () => {
				setDirectories((prev) => prev.filter((dir) => dir.id !== directoryId));
				setModalProps(modalPropsDefault);
			},
			onCancel: () => {
				setModalProps(modalPropsDefault);
			},
		});
	};

	return (
		<>
			<div className="flex flex-col h-full">
				<button
					className="button w-full mb-6"
					onClick={(e) => {
						e.preventDefault();
						handleAdd();
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
							<div className="hidden group-hover:flex group-hover:pl-3">
								<button
									className="edit-button hover:scale-110"
									onClick={(e) => {
										e.preventDefault();
										handleEdit(directory.id);
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
										e.preventDefault();
										handleDelete(directory.id);
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

			<Modal
				show={modalProps.show}
				title={modalProps.title}
				content={modalProps.content}
				action={modalProps.action}
				onAction={modalProps.onAction}
				onCancel={modalProps.onCancel}
			/>
		</>
	);
};

export default HomeSideBar;
