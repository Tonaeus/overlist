import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Close, Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

interface Directory {
	id: string;
	label: string;
}

const HomeSideBar = () => {
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

	const { id } = useParams();

	const [showModal, setShowModal] = useState<boolean>(false);

	const handleAdd = () => {
		setShowModal(true);
	};

	const handleEdit = (directoryId: string) => {
		const newLabel = prompt("Edit directory name:", "");
		if (newLabel) {
			setDirectories((prev) =>
				prev.map((dir) =>
					dir.id === directoryId ? { ...dir, label: newLabel } : dir
				)
			);
		}
	};

	const handleDelete = (directoryId: string) => {
		if (confirm("Are you sure you want to delete this directory?")) {
			setDirectories((prev) => prev.filter((dir) => dir.id !== directoryId));
		}
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

			<div
				className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50 ${showModal ? '' : 'hidden'}`} 
			>
				<div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm">
					<div className="flex flex-row justify-between items-center mb-6">
						<h2 className="text-xl font-bold">Modal Title</h2>
						<button
							className="hover:scale-110"
							onClick={(e) => {
								e.preventDefault();
								setShowModal(false);
							}}
						>
							<Close/>
						</button>
					</div>

					<div className="mb-6">
							Content
					</div>

					<div className="flex flex-row justify-end items-center">
						<button
							className="button-secondary px-3 py-1.5 mr-1.5"
							onClick={(e) => {
								e.preventDefault();
								setShowModal(false);}
							}
						>
							Cancel
						</button>
						<button className="button px-3 py-1. ml-1.5">
							Confirm
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeSideBar;
