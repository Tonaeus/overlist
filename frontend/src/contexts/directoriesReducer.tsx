import type { DirectoriesState, DirectoriesAction } from "../types/Directory";

const directoriesReducer = (
	state: DirectoriesState,
	action: DirectoriesAction
) => {
	switch (action.type) {
		case "SET_DIRECTORIES":
			return {
				directories: action.payload,
			};
		default:
			return state;
	}
};

export default directoriesReducer;
