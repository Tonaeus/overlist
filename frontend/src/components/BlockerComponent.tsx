import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

import useModal from "../hooks/useModal";
import Modal from "./Modal";
import ModalContentText from "./ModalContentText";

type BlockerComponentProps = {
	shouldBlock: boolean;
};

const BlockerComponent = ({ shouldBlock }: BlockerComponentProps) => {
	const blocker = useBlocker(
		({ currentLocation, nextLocation }) =>
			shouldBlock && currentLocation.pathname !== nextLocation.pathname
	);

	const { modalProps, showModal, hideModal } = useModal();

	useEffect(() => {
		if (blocker.state === "blocked") {
			showModal({
				title: "Unsaved Changes",
				content: (
					<ModalContentText message="You have unsaved changes. Are you sure you want to discard them?" />
				),
				action: "Discard",
				onAction: async () => {
					blocker.proceed();
				},
				onCancel: () => {
					blocker.reset();
					hideModal();
				},
			});
		}
	}, [blocker.state]);

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (shouldBlock) {
				e.preventDefault();
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [shouldBlock]);

	return <Modal {...modalProps} />;
};

export default BlockerComponent;
