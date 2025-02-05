type Directory = {
	id: string;
	label: string;
};

type DirectoriesState = {
	directories: Directory[];
};

type DirectoriesAction =
	| { type: "SET_DIRECTORIES"; payload: Directory[] }
	| { type: "CREATE_DIRECTORY"; payload: Directory }
	| { type: "UPDATE_DIRECTORY"; payload: Directory }
	| { type: "DELETE_DIRECTORY"; payload: Directory };

export type { Directory, DirectoriesState, DirectoriesAction };
