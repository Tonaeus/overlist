interface ModalContentInputProps {
	placeholder?: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalContentInput = ({
	placeholder = "",
	error = "",
	onChange,
}: ModalContentInputProps) => (
	<>
		<input
			type="text"
			placeholder={placeholder}
			className={`h-9 w-full border border-line rounded p-1.5 focus:outline-none truncate placeholder-placeholder ${
				error ? "mb-1.5" : ""
			}`}
			onChange={onChange}
		/>
		{error && (
			<div className="w-full min-h-9 border border-red-500 rounded p-1.5 bg-red-100 text-red-500 break-words whitespace-normal">
				{error}
			</div>
		)}
	</>
);

export default ModalContentInput;
