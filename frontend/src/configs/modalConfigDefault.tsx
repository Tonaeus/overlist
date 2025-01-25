import type { ModalConfig } from "../types/ModalConfig";

const modalConfigDefault: ModalConfig = {
	show: false,
	title: "",
	content: <></>,
	action: "",
	onAction: () => {},
	onCancel: () => {},
};

export default modalConfigDefault;