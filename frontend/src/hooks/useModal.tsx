import { useRef, useState } from "react";
import type { ModalProps } from "../types/ModalProps";
import modalPropsDefault from "../configs/modalPropsDefault";

const useModal = () => {
	const [modalProps, setModalProps] = useState<ModalProps>(modalPropsDefault);
	const valueRef = useRef<string>("");

	const showModal = (props: Partial<ModalProps>) => {
		setModalProps((prev) => ({ ...prev, show: true, ...props }));
	};

	const hideModal = () => {
		setModalProps(modalPropsDefault);
		valueRef.current = "";
	};

	const getModalValue = () => valueRef.current;

	const setModalValue = (value: string) => {
		valueRef.current = value;
	};

	return { modalProps, showModal, hideModal, getModalValue, setModalValue };
};

export default useModal;
