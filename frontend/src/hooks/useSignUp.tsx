import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignUp = () => {
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();

	const signUp = async (username: string, password: string) => {
		setIsLoading(true);
		setError("");

		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		const json = await response.json();

		if (response.ok) {
      console.log(json);

			localStorage.setItem("user", JSON.stringify(json));

			dispatch({ type: "LOGIN", payload: json });
			setIsLoading(false);
		} else {
			setIsLoading(false);
			setError(json.error);
		}
	};

	return { signUp, isLoading, error };
};

export default useSignUp;
