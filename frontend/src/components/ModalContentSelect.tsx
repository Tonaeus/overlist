import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

type ModalContentSelectProps = {
	placeholder: string;
	options: { value: string; label: string }[];
	error?: string;
	onChange: (value: string) => void;
};

const ModalContentSelect = ({
	placeholder,
	options,
	error = "",
	onChange,
}: ModalContentSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	useEffect(() => {
		setSelectedOption(null);
	}, [error]);

	const handleSelect = (value: string) => {
		setSelectedOption(value);
		setIsOpen(false);
		onChange(value);
	};

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
					{selectedOption
						? options.find((opt) => opt.value === selectedOption)?.label
						: placeholder}
				</span>
				{!isOpen ? <ArrowDropDown /> : <ArrowDropUp />}
			</div>
			{isOpen && (
				<div
					className={`${
						error ? "" : "mt-1.5"
					} absolute w-full border border-line bg-white rounded shadow-lg z-10 max-h-[182px] overflow-y-auto`}
				>
					{options.map((option) => (
						<div
							key={option.value}
							className="h-9 p-1.5 truncate hover:bg-hovered cursor-pointer"
							onClick={() => handleSelect(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
			{error && (
				<div
					className={`${
						isOpen ? "opacity-0" : ""
					} w-full min-h-9 border border-red-500 rounded p-1.5 bg-red-100 text-red-500 break-words whitespace-normal`}
				>
					{error}
				</div>
			)}
		</div>
	);
};

export default ModalContentSelect;
