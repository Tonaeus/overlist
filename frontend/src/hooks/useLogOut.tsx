import useAuthContext from "./useAuthContext";

const useLogOut = () => {
	const { dispatch } = useAuthContext();

	const logOut = () => {
		localStorage.removeItem("user");

		dispatch({ type: "LOGOUT" });
	};

	return { logOut };
};

export default useLogOut;
