import { useState } from "react";
import useSignUp from "../hooks/useSignUp";
import UserAndPass from "../layouts/UserAndPass";

const Login = () => {
	const { signUp, isLoading, error } = useSignUp();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		await signUp(username, password);
	};

	return (
		<UserAndPass
			onSubmit={handleLogin}
			title="Sign Up for Overlist"
			isLoading={isLoading}
			error={error}
			setUsername={setUsername}
			setPassword={setPassword}
			buttonText="Sign Up"
			accountText="Already have an account?"
			linkText="Log In"
			linkTo="/login/"
		/>
	);
};

export default Login;
