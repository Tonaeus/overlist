import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

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

	const [isScreenLarge, setIsScreenLarge] = useState<boolean>(false);
	const location = useLocation();
	const prevPathname = useRef<string>(location.pathname);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsScreenLarge(window.innerWidth >= 1024);
		};

		checkScreenSize();

		window.addEventListener("resize", checkScreenSize);

		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	useEffect(() => {
		const checkScreenSize = () => {
			if (window.innerWidth >= 1024) {
				setIsSideBarVisible(true);
			} else {
				setIsSideBarVisible(false);
			}
		};

		checkScreenSize();
	}, []);

	useEffect(() => {
		const newPathname = location.pathname;

		const isSwitchingBetweenPages =
			(prevPathname.current.startsWith("/directory") &&
				newPathname.startsWith("/list")) ||
			(prevPathname.current.startsWith("/list") &&
				newPathname.startsWith("/directory"));

		if (isSwitchingBetweenPages) {
			setIsSideBarVisible(isScreenLarge);
		}

		prevPathname.current = newPathname;
	}, [location.pathname, isScreenLarge]);

	return (
		<SideBarContext.Provider value={{ isSideBarVisible, toggleSideBar }}>
			{children}
		</SideBarContext.Provider>
	);
};

export { SideBarContext, SideBarContextProvider };
