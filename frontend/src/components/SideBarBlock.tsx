import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

type SideBarBlockProps = {
	object: any;
	id?: string;
	to?: string;
	handleEdit: (e: React.MouseEvent<HTMLButtonElement>, object: any) => void;
	handleDelete: (e: React.MouseEvent<HTMLButtonElement>, object: any) => void;
};

const SideBarBlock = ({
	object,
	id,
	to,
	handleEdit,
	handleDelete,
}: SideBarBlockProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	const handleMouseEnter = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(true);
	};

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => setIsVisible(false), 1);
	};

	const blockContent = (
		<div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
			{object.label}
		</div>
	);

	const blockButtons = (
		<div className="flex pl-3">
			<button
				className="edit-button hover:scale-110"
				onClick={(e) => handleEdit(e, object)}
			>
				<Edit />
			</button>
			<Tooltip anchorSelect=".edit-button" place="top">
				Edit
			</Tooltip>
			<button
				className="delete-button hover:scale-110"
				onClick={(e) => handleDelete(e, object)}
			>
				<Delete />
			</button>
			<Tooltip anchorSelect=".delete-button" place="top">
				Delete
			</Tooltip>
		</div>
	);

	return to ? (
		<Link
			to={to}
			className={`h-9 flex justify-start items-center px-3 py-1.5 rounded-full ${
				object.id === id
					? "bg-selected text-blue-700"
					: "hover:bg-hovered"
			} group`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{blockContent}
			{isVisible && blockButtons}
		</Link>
	) : (
		<div
			className={`h-9 flex justify-start items-center px-3 py-1.5 rounded-full hover:bg-hovered group`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{blockContent}
			{isVisible && blockButtons}
		</div>
	);
};

export default SideBarBlock;
