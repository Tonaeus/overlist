interface ModalContentTextProps {
	message: string;
}

const ModalContentText = ({ message }: ModalContentTextProps) => {
	return <p className="w-full">{message}</p>;
};

export default ModalContentText;
