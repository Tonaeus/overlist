import { useParams } from "react-router-dom";

import { Edit } from "@mui/icons-material";
import { Tooltip } from "react-tooltip";

// import useModal from "../hooks/useModal";
// import Modal from "./Modal";
// import ModalContentInput from "./ModalContentInput";

const ListTableName = () => {
	const { label } = useParams();
	// const [name, setName] = useState<string>(label);

	// useEffect(() => {
	// 	const fetchDirectories = async () => {
	// 		const response = await fetch(
	// 			`${import.meta.env.VITE_BACKEND_URL}/api/lists/${list_id}`
	// 		);
	// 		const json = await response.json();

	// 		if (response.ok) {
	// 			// dispatch({ type: "SET_DIRECTORIES", payload: json });
	// 		}
	// 	};

	// 	fetchDirectories();
	// }, []);

	// const { modalProps, showModal, hideModal, getModalValue, setModalValue } =
	// 	useModal();

	// const handleEdit = (
	// 	e: React.MouseEvent<HTMLButtonElement>,
	// 	directory: Directory
	// ) => {
	// 	e.preventDefault();

	// 	showModal({
	// 		title: "Edit List",
	// 		content: (
	// 			<ModalContentInput
	// 				placeholder="Enter list label"
	// 				onChange={(e) => setModalValue(e.target.value)}
	// 			/>
	// 		),
	// 		action: "Edit",
	// 		onAction: async () => {
	// 			const response = await fetch(
	// 				`${import.meta.env.VITE_BACKEND_URL}/api/lists/${directory.id}`,
	// 				{
	// 					method: "PATCH",
	// 					body: JSON.stringify({ label: getModalValue() }),
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 					},
	// 				}
	// 			);

	// 			const json = await response.json();

	// 			if (response.ok) {
	// 				dispatch({ type: "UPDATE_DIRECTORY", payload: json });
	// 				hideModal();
	// 			} else {
	// 				showModal({
	// 					content: (
	// 						<ModalContentInput
	// 							placeholder="Enter list label"
	// 							error={json.error}
	// 							onChange={(e) => setModalValue(e.target.value)}
	// 						/>
	// 					),
	// 				});
	// 			}
	// 		},
	// 		onCancel: () => hideModal(),
	// 	});
	// };

	return (
		<>
			<label
				htmlFor="search"
				className="w-1/2 rounded-full flex flex-row bg-white border border-line"
			>
				<div className="h-full w-[calc(100%-38px)] focus:outline-none pl-[18px] pr-3 py-1.5">
					{label}
				</div>

				<button
					className="flex justify-center items-center pr-[18px] hover:scale-110"
					// onClick={(e) => handleEdit(e)}
				>
					<div className="edit-button flex justify-center items-center h-full">
						<Edit />
					</div>
				</button>
				<Tooltip anchorSelect=".edit-button" place="top">
					Edit
				</Tooltip>
			</label>

			{/* <Modal {...modalProps} /> */}
		</>
	);
};

export default ListTableName;
