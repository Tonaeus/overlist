type ModalContentInputProps = {
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
			autoFocus
		/>
		{error && (
			<div className="error">
				{error}
			</div>
		)}
	</>
);

export default ModalContentInput;
