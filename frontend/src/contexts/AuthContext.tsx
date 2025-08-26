import type { AuthState, AuthAction } from "../types/Auth";

import { createContext, Dispatch, useEffect, useReducer } from "react";

import authReducer from "../reducers/authReducer";

type AuthContextType = {
	state: AuthState;
	dispatch: Dispatch<AuthAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const item = localStorage.getItem("user")
		const user: any = item ? JSON.parse(item) : null;

		if (user) {
			dispatch({ type: "LOGIN", payload: user })
		}
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
