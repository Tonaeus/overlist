type AuthState = {
	user: any | null;
};

type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

export type { AuthState, AuthAction };
