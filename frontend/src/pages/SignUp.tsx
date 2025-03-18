import { useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

	const { signUp, isLoading, error } = useSignUp();

	const handleSubmit = async () => {
		await signUp(username, password);
	};

	return (
		<div className="flex flex-col h-screen items-center">
			<div className="flex flex-col h-full justify-center items-center">
				<div className="flex flex-col w-80">
					<h1 className="text-center text-2xl font-bold mb-6">
						Sign Up for Overlist
					</h1>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						className="h-9 px-[18px] py-1.5 rounded-full border border-line focus:outline-none mb-3"
					/>
					<label htmlFor="password">Password</label>
					<div className="flex flex-row px-[18px] w-full h-9 rounded-full border border-line mb-9">
						<input
							id="password"
							type={isPasswordVisible ? "text" : "password"}
							onChange={(e) => setPassword(e.target.value)}
							className="flex-1 py-1.5 pr-3 focus:outline-none h-9"
						/>
						<button
							type="button"
							onClick={togglePasswordVisibility}
							className="flex justify-center items-center"
						>
							{isPasswordVisible ? <VisibilityOff /> : <Visibility />}
						</button>
					</div>
					<button
						type="button"
						className="button mb-3"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						Sign Up
					</button>
					{error && <div>{error}</div>}
					<p className="text-center">
						Already have an account?{" "}
						<Link to="/login/" className="text-blue-700 hover:underline">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
