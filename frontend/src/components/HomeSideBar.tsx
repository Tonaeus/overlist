import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

interface Directory {
	id: string;
	label: string;
}

const HomeSideBar = () => {
	const [directories, setDirectories] = useState<Directory[]>([
		{ id: "1", label: "Documents" },
		{ id: "2", label: "Pictures" },
		{ id: "3", label: "Music" },
		{ id: "4", label: "Downloads" },
		{ id: "5", label: "Videos" },
		{ id: "6", label: "Documents" },
		{ id: "7", label: "Pictures" },
		{ id: "8", label: "Music" },
		{ id: "9", label: "Downloads" },
		{ id: "10", label: "Videos" },
		{ id: "11", label: "Documents" },
		{ id: "12", label: "Pictures" },
		{ id: "13", label: "Music" },
		{ id: "14", label: "Downloads" },
		// { id: "15", label: "Videos" },
		// { id: "16", label: "Documents" },
		// { id: "17", label: "Pictures" },
		// { id: "18", label: "Music" },
		// { id: "19", label: "Downloads" },
		// { id: "20", label: "Videos" },
		// { id: "21", label: "Documents" },
		// { id: "22", label: "Pictures" },
		// { id: "23", label: "Music" },
		// { id: "24", label: "Downloads" },
		// { id: "25", label: "Videos" },
	]);

	const { id } = useParams();

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
		<div className="flex flex-col h-full">
			<button className="button w-full mb-6">Add Directory</button>
			<div className="flex-1 overflow-y-auto">
				{directories.map((directory: Directory) => (
					<Link
						key={directory.id}
						to={`/directory/${directory.id}`}
						className={`h-9 flex justify-start items-center px-3 py-2 rounded-full ${
							directory.id === id
								? "bg-selected text-blue-700"
								: "hover:bg-hovered"
						} group`}
					>
						<div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
							{directory.label}
						</div>
						<div className="hidden group-hover:flex group-hover:pl-1.5">
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
	);
};

export default HomeSideBar;
