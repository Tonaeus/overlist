import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

const ListTableName = () => {
	const { id } = useParams();
	const [label, setLabel] = useState<string>("");

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [tempLabel, setTempLabel] = useState<string>("");

	useEffect(() => {
		const fetchList = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/lists/${id}`
			);
			const json = await response.json();

			if (response.ok) {
				setLabel(json.label);
			}
		};

		fetchList();
	}, [id]);

	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setIsEditing(true);
		setTempLabel(label);
	};

	const handleSave = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_URL}/api/lists/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ label: tempLabel }),
			}
		);

		const json = await response.json();

		if (response.ok) {
			setLabel(json);
			setIsEditing(false);
		} else {
			setIsEditing(false);
		}
	};

	return (
		<div
			className={`w-1/2 rounded-full flex flex-row border border-line ${
				isEditing ? "bg-white" : ""
			}`}
		>
			{isEditing ? (
				<>
					<div className="h-full pl-[18px]"></div>
					<input
						type="text"
						value={tempLabel}
						onChange={(e) => setTempLabel(e.target.value)}
						className="h-full w-full focus:outline-none"
						autoFocus
						onBlur={handleSave}
						onKeyDown={(e) => e.key === "Enter" && handleSave()}
					/>
					<div className="h-full pr-[18px]"></div>
				</>
			) : (
				<div className="flex items-center h-full w-[calc(100%-38px)] focus:outline-none pl-[18px] pr-3 py-1.5 truncate">
					{label}
				</div>
			)}

			{!isEditing && (
				<>
					<button
						className="flex justify-center items-center pr-[18px] hover:scale-110"
						onClick={(e) => handleEdit(e)}
					>
						<div className="edit-button flex justify-center items-center h-full">
							<Edit />
						</div>
					</button>
					<Tooltip anchorSelect=".edit-button" place="top">
						Edit
					</Tooltip>
				</>
			)}
		</div>
	);
};

export default ListTableName;
