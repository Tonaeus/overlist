type ModalContentTextProps = {
	message: string;
	error?: string;
};

const ModalContentText = ({ message, error }: ModalContentTextProps) => {
	return (
		<>
			<p className={`${error ? "mb-1.5" : ""} break-words hyphens-auto`}>
				{message}
			</p>
			{error && (
				<div className="w-full min-h-9 border border-red-500 rounded p-1.5 bg-red-100 text-red-500 break-words whitespace-normal">
					{error}
				</div>
			)}
		</>
	);
};

export default ModalContentText;
