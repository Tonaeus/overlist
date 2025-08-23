import { useState } from "react";
import useLogIn from "../hooks/useLogIn";
import Account from "../layouts/Account";

const Login = () => {
	const { logIn, isLoading, error } = useLogIn();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		await logIn(username, password);
	};

	return (
		<Account
			onSubmit={handleLogin}
			title="Log In to Overlist"
			isLoading={isLoading}
			error={error}
			setUsername={setUsername}
			password={password}
			setPassword={setPassword}
			buttonText="Log In"
			accountText="Don't have an account?"
			linkText="Sign Up"
			linkTo="/signup/"
		/>
	);
};

export default Login;
