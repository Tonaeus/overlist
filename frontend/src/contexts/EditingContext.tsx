import { createContext, useState } from "react";

type EditingContextType = {
	isEditing: boolean;
	startEditing: () => void;
	stopEditing: () => void;
};

const EditingContext = createContext<EditingContextType | undefined>(undefined);

const EditingContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const startEditing = () => setIsEditing(true);
	const stopEditing = () => setIsEditing(false);

	return (
		<EditingContext.Provider value={{ isEditing, startEditing, stopEditing }}>
			{children}
		</EditingContext.Provider>
	);
};

export { EditingContext, EditingContextProvider };
