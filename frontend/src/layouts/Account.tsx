import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type UserAndPassProps = {
	onSubmit: () => Promise<void>;
	title: string;
	isLoading: boolean;
	error: string | null;
	setUsername: (username: string) => void;
	password: string;
	setPassword: (password: string) => void;
	buttonText: string;
	accountText: string;
	linkText: string;
	linkTo: string;
}

const Account = ({
	onSubmit,
	title,
	isLoading,
	error,
	setUsername,
	password,
	setPassword,
	buttonText,
	accountText,
	linkText,
	linkTo,
}: UserAndPassProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
				onSubmit();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onSubmit]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await onSubmit();
	};

	return (
		<div className="flex flex-col h-screen items-center px-6">
			<div className="flex flex-col h-full w-full max-w-xs justify-center items-center">
				<form className="flex flex-col w-full" onSubmit={handleSubmit}>
					<h1 className="text-center text-2xl font-bold mb-6">{title}</h1>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						className="h-9 px-[18px] py-1.5 rounded-full border border-line focus:outline-none mb-3"
						disabled={isLoading}
					/>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="flex [@media(min-width:350px)]:hidden h-9 px-[18px] py-1.5 rounded-full border border-line focus:outline-none mb-[18px]"
						disabled={isLoading}
					/>
					<div className="hidden [@media(min-width:350px)]:flex flex-row px-[18px] w-full h-9 rounded-full border border-line mb-[18px]">
						<input
							id="password"
							type={isPasswordVisible && !isLoading ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={`flex-1 py-1.5 ${
								isLoading ? "" : "pr-3"
							} focus:outline-none h-9`}
							disabled={isLoading}
						/>
						{!isLoading && (
							<button
								type="button"
								onClick={togglePasswordVisibility}
								className="flex justify-center items-center hover:scale-110"
								disabled={isLoading}
							>
								{isPasswordVisible ? <VisibilityOff /> : <Visibility />}
							</button>
						)}
					</div>
					{error && <div className="error whitespace-pre-wrap">{error}</div>}
					<button
						type="submit"
						className="button mt-[18px] mb-3"
						disabled={isLoading}
					>
						{buttonText}
					</button>
					<p className="text-center">
						{accountText}{" "}
						<Link to={linkTo} className="text-blue-700 hover:underline">
							{linkText}
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Account;
