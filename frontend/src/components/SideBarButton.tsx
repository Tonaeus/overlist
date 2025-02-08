type SideBarButtonProps = {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SideBarButton = ({ label, onClick }: SideBarButtonProps) => {
	return (
		<button className="button w-full mb-6" onClick={onClick}>
			{label}
		</button>
	);
};

export default SideBarButton;
