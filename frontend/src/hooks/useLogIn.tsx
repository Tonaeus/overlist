import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { BACKEND_URL } from "../configs/dotenvConfig";

const useLogIn = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const logIn = async (username: string, password: string) => {
    setIsLoading(true);
    setError("");

    const response = await fetch(
      `${BACKEND_URL}/api/user/login/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(json.error);
    }
  };

  return { logIn, isLoading, error };
};

export default useLogIn;
