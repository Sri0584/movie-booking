import { H2, Button, Input, Text, Spinner } from "@salt-ds/core";
import { useRef,useState, type SubmitEvent, type ChangeEvent } from "react";
import { useLoginMutation } from "../features/auth/usersApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const submittingRef = useRef(false);
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);
		if (submittingRef.current) return;
		
		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Please enter a valid email address");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}

		if(isLoading) {
			setError("Please wait for the login to complete");
			return;
		}
		submittingRef.current = true;
		try {
			const result = await login({ email, password }).unwrap();
			if ("email" in result) {
				navigate("/");
			}
			// TODO: redirect to dashboard or home page after successful login
		} catch (err: any) {
			setError(err.data?.message || err.message || "Login failed");
		} finally {
			submittingRef.current = false;
		}
	};

	return (
		<form onSubmit={handleSubmit} className='login-form' 
		aria-label='Login form' 
		aria-busy={submittingRef.current}
		aria-disabled={submittingRef.current}
		aria-live='polite'
		aria-atomic='true'
		>
			<H2>Login</H2>
			{error && <Text className='error message' role='alert' aria-live='assertive'>{error}</Text>}
			<Input
				aria-required='true'
				aria-label='Email'
				placeholder='Email'
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>
			<Input
				aria-required='true'
				aria-label='Password'
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<Button appearance='solid'
				type='submit'
				disabled={isLoading}
				aria-label='Login button'
				aria-busy={isLoading}
				aria-disabled={isLoading}>
				{isLoading ? <Spinner /> : "Login"}
			</Button>
		</form>
	);
}
