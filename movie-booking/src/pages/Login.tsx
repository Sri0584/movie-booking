import { H2, Button, Input, Text } from "@salt-ds/core";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useLoginMutation } from "../features/auth/usersApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const result = await login({ email, password }).unwrap();
			console.log("user" in result);
			if ("email" in result) {
				navigate("/");
			}
			// TODO: redirect to dashboard or home page after successful login
		} catch (err: any) {
			setError(err.data?.message || err.message || "Login failed");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<H2>Login</H2>
			{error && <Text>{error}</Text>}
			<Input
				placeholder='Email'
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>
			<Input
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<Button appearance='solid' type='submit' disabled={isLoading}>
				{isLoading ? "Logging in..." : "Login"}
			</Button>
		</form>
	);
}
