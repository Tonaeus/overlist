import { createContext, useState } from "react";

type SideBarContextType = {
	isSideBarVisible: boolean;
	toggleSideBar: () => void;
};

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

const SideBarContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [isSideBarVisible, setIsSideBarVisible] = useState<boolean>(false);

	const toggleSideBar = () => {
		setIsSideBarVisible((prevState: boolean) => !prevState);
	};

	return (
		<SideBarContext.Provider value={{ isSideBarVisible, toggleSideBar }}>
			{children}
		</SideBarContext.Provider>
	);
};

export { SideBarContext, SideBarContextProvider };
