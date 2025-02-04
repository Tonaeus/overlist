import { useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface ModalContentSelectProps {
	placeholder: string;
	options: { value: string; label: string }[];
	error?: string;
}

const ModalContentSelect = ({
	placeholder,
	options,
	error = "",
}: ModalContentSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<{
		value: string;
		label: string;
	} | null>(null);

	return (
		<div className="relative w-full">
			<div
				className={`h-9 w-full border border-line rounded p-1.5 bg-white flex justify-between cursor-pointer ${
					error ? "mb-1.5" : ""
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span
					className={`truncate ${!selectedOption ? "text-placeholder" : ""}`}
				>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				{!isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
			</div>
			{isOpen && (
				<div className="absolute mt-1.5 w-full border border-line bg-white rounded shadow-lg z-10 max-h-[182px] overflow-y-auto">
					{options.map((option) => (
						<div
							key={option.value}
							className="h-9 p-1.5 truncate hover:bg-hovered cursor-pointer"
							onClick={() => {
								setSelectedOption(option);
								setIsOpen(false);
							}}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
			{error && (
				<div className="w-full min-h-9 border border-red-500 rounded p-1.5 bg-red-100 text-red-500 break-words whitespace-normal">
					{error}
				</div>
			)}
		</div>
	);
};

export default ModalContentSelect;
