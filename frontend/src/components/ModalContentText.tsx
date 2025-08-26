type ModalContentTextProps = {
	message: string;
	error?: string;
};

const ModalContentText = ({ message, error }: ModalContentTextProps) => {
	return (
		<>
			<p className={`${error ? "mb-1.5" : ""} break-words`}>
				{message}
			</p>
			{error && (
				<div className="error">
					{error}
				</div>
			)}
		</>
	);
};

export default ModalContentText;
