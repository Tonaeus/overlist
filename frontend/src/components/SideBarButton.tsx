import useSideBarContext from "../hooks/useSideBarContext";

type SideBarButtonProps = {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
};

const SideBarButton = ({ label, onClick, disabled }: SideBarButtonProps) => {
	const { isSideBarVisible } = useSideBarContext();

	return (
		<button
			className={`button w-[calc(100vw-48px)] lg:w-[204px] my-6 whitespace-nowrap transition-all duration-150 ${
				!isSideBarVisible ? "text-transparent" : ""
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default SideBarButton;
