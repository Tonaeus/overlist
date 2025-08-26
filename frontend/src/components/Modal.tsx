import { useEffect } from "react";
import type { ModalProps } from "../types/ModalProps";

import { Close } from "@mui/icons-material";

const Modal = ({
	show,
	title,
	content,
	action,
	onAction,
	onCancel,
}: ModalProps) => {
	useEffect(() => {
		if (show) {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "Enter") {
					onAction();
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [show, onAction]);

	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
			<div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm">
				<div className="flex flex-row justify-between items-center mb-6">
					<h2 className="text-xl font-bold">{title}</h2>
					<button className="hover:scale-110" onClick={onCancel}>
						<Close />
					</button>
				</div>
				<div className="mb-6">{content}</div>
				<div className="flex flex-row justify-end items-center">
					<button
						className="button-cancel px-3 py-1.5 mr-1.5"
						onClick={onCancel}
					>
						Cancel
					</button>
					<button className="button px-3 py-1.5 ml-1.5" onClick={onAction}>
						{action}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
