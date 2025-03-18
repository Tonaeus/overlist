type AuthState = {
	user: string | null;
};

type AuthAction = { type: "LOGIN"; payload: string } | { type: "LOGOUT" };

export type { AuthState, AuthAction };
