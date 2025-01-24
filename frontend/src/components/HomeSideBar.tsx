import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

import Modal from "./Modal";

interface Directory {
	id: string;
	label: string;
}

const defaultModalConfig = {
	show: false,
	title: "",
	content: null,
	action: "",
	onAction: () => {},
	onCancel: () => {},
};

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

	const [modalConfig, setModalConfig] = useState<{
		show: boolean;
		title: string;
		content: React.ReactNode;
		action: string;
		onAction: () => void;
		onCancel: () => void;
	}>(defaultModalConfig);

	const handleAdd = () => {
		let inputValue = "";

		const InputContent = (errorMessage = "") => (
			<>
				<input
					type="text"
					placeholder="Enter directory name"
					className={`h-9 w-full border border-line rounded p-1.5 focus:outline-none ${
						errorMessage ? "mb-1.5" : ""
					}`}
					onChange={(e) => {
						inputValue = e.target.value;
					}}
				/>
				{errorMessage && (
					<div className="h-9 w-full border border-red-500 rounded p-1.5 bg-red-100 text-red-500">
						{errorMessage}
					</div>
				)}
			</>
		);

		setModalConfig({
			show: true,
			title: "Add Directory",
			content: InputContent(),
			action: "Add",
			onAction: () => {
				const directoryName = inputValue.trim();
				if (directoryName) {
					setDirectories((prev) => [
						...prev,
						{ id: `${Date.now()}`, label: directoryName },
					]);
					setModalConfig(defaultModalConfig);
				} 
				else {
					setModalConfig((prev) => ({
						...prev,
						content: InputContent("Directory name cannot be empty."),
					}));
				}
			},
			onCancel: () => {
				setModalConfig(defaultModalConfig);
			},
		});
	};

	// useEffect(() => {
	//   console.log("modalConfig:", modalConfig);
	// }, [modalConfig]);

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

			<Modal
				show={modalConfig.show}
				title={modalConfig.title}
				content={modalConfig.content}
				action={modalConfig.action}
				onAction={modalConfig.onAction}
				onCancel={modalConfig.onCancel}
			/>
		</>
	);
};

export default HomeSideBar;
