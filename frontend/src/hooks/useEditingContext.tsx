import { useContext } from "react";
import { EditingContext } from "../contexts/EditingContext";

const useEditingContext = () => {
	const context = useContext(EditingContext);

	if (!context) {
		throw Error(
			"useEditingContext must be used inside a EditingContextProvider."
		);
	}

	return context;
};

export default useEditingContext;
