interface ModalConfig {
	show: boolean;
	title: string;
	content: React.ReactNode;
	action: string;
	onAction: () => void;
	onCancel: () => void;
}

export type { ModalConfig };