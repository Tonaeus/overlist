import type { ModalProps } from "../types/ModalProps";

const modalPropsDefault: ModalProps = {
	show: false,
	title: "",
	content: <></>,
	action: "",
	onAction: () => {},
	onCancel: () => {},
};

export default modalPropsDefault;