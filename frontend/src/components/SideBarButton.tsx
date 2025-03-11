type SideBarButtonProps = {
	label: string;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
};

const SideBarButton = ({ label, onClick, disabled }: SideBarButtonProps) => {
	return (
		<button className="button w-full mb-6" onClick={onClick} disabled={disabled}>
			{label}
		</button>
	);
};

export default SideBarButton;
