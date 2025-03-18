import type { DirectoriesState, DirectoriesAction } from "../types/Directory";

import { sortObjectsByProp } from "../utils/sortUtils";

const directoriesReducer = (
	state: DirectoriesState,
	action: DirectoriesAction
) => {
	switch (action.type) {
		case "SET_DIRECTORIES":
			return {
				directories: action.payload,
			};
		case "CREATE_DIRECTORY":
			return {
				directories: [...state.directories, action.payload].sort(
					sortObjectsByProp("label")
				),
			};
		case "UPDATE_DIRECTORY":
			return {
				directories: state.directories
					.map((dir) => (dir.id === action.payload.id ? action.payload : dir))
					.sort(sortObjectsByProp("label")),
			};
		case "DELETE_DIRECTORY":
			return {
				directories: state.directories.filter(
					(dir) => dir.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};

export default directoriesReducer;
