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
	disabled?: boolean;
};

const SideBarBlock = ({
	object,
	id,
	to,
	handleEdit,
	handleDelete,
	disabled,
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
		<div className="w-full truncate py-1.5">
			{object.label}
		</div>
	);

	const blockButtons = disabled ? null : (
		<div className="flex pl-3 h-full">
			<button
				className="hover:scale-110"
				onClick={(e) => handleEdit(e, object)}
			>
				<div className="edit-button flex justify-center items-center h-full">
					<Edit />
				</div>
			</button>
			<Tooltip anchorSelect=".edit-button" place="top">
				Edit
			</Tooltip>
			<button
				className="hover:scale-110"
				onClick={(e) => handleDelete(e, object)}
			>
				<div className="delete-button flex justify-center items-center h-full">
					<Delete />
				</div>
			</button>
			<Tooltip anchorSelect=".delete-button" place="top">
				Delete
			</Tooltip>
		</div>
	);

	return to ? (
		<Link
			to={to}
			className={`h-9 w-[calc(100vw-48px)] lg:w-52 flex justify-start items-center px-3 rounded-full ${
				object.id === id ? "bg-selected text-blue-700" : "hover:bg-hovered"
			} group`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{blockContent}
			{isVisible && blockButtons}
		</Link>
	) : (
		<div
			className={`h-9 w-[calc(100vw-48px)] lg:w-52 flex justify-start items-center px-3 rounded-full hover:bg-hovered group`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{blockContent}
			{isVisible && blockButtons}
		</div>
	);
};

export default SideBarBlock;
