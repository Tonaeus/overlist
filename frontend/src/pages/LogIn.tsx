import { useState } from "react";
import useLogIn from "../hooks/useLogIn";
import UserAndPass from "../layouts/UserAndPass";

const Login = () => {
	const { logIn, isLoading, error } = useLogIn();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		await logIn(username, password);
	};

	return (
		<UserAndPass
			onSubmit={handleLogin}
			title="Log In to Overlist"
			isLoading={isLoading}
			error={error}
			setUsername={setUsername}
			setPassword={setPassword}
			buttonText="Log In"
			accountText="Don't have an account?"
			linkText="Sign Up"
			linkTo="/signup/"
		/>
	);
};

export default Login;
