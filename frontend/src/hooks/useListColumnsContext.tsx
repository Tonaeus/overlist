import { useContext } from "react";
import { ListColumnsContext } from "../contexts/ListColumnsContext";

const useListColumnsContext = () => {
	const context = useContext(ListColumnsContext);

	if (!context) {
		throw Error(
			"useListColumnsContext must be used inside a ListColumnsContextProvider."
		);
	}

	return context;
};

export default useListColumnsContext;
