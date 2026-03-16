import { Button, H2, Input, Text, FormFieldHelperText, Spinner } from "@salt-ds/core";
import { useState, type SubmitEvent, type ChangeEvent, useRef } from "react";
import { useRegisterMutation } from "../features/auth/usersApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const submittingRef = useRef(false);
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);
		if (submittingRef.current) return;
		const trimmedEmail = email.trim();
		if (!trimmedEmail || !password) {
			setError("Please fill in all fields");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			setError("Please enter a valid email address");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters long");
			return;
		}	
		if (isLoading) {
			setError("Please wait for the registration to complete");
			return;
		}
		submittingRef.current = true;
		try {
			const result = await register({ email: trimmedEmail, password: password }).unwrap();

			if ("message" in result) {
				// backend returned a 200 with a message (e.g. already registered)
				setError(result.message);
			} else {
				setSuccess(true);
				if ("user" in result) {
					navigate("/");
				}
			}
		} catch (err: any) {
			setError(err.data?.message || err.message || "Registration failed");
		} finally {
			submittingRef.current = false;
		}
	};

	return (
		<form onSubmit={handleSubmit} 
		className='register-form' 
		aria-label='Register form' 
		aria-busy={submittingRef.current}
		aria-disabled={submittingRef.current}
		aria-live='polite'
		aria-atomic='true'
		>
			<H2>Register</H2>
			{error && <Text className='error message' role='alert' aria-live='assertive'>{error}</Text>}
			{success && <Text className='success message' role='alert' aria-live='polite'>Account created!</Text>}

			<Input
				aria-required='true'
				aria-label='Email'
				placeholder='Email'
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>
			<FormFieldHelperText>We'll never share your email.</FormFieldHelperText>

			<Input
				aria-required='true'
				aria-label='Password'
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<FormFieldHelperText>
				Password must be at least 6 characters.
			</FormFieldHelperText>
			<Button appearance='solid' type='submit'
				aria-label='Register button'
				aria-busy={isLoading}
				aria-disabled={isLoading}
				aria-live='polite'
				aria-atomic='true'>
				{isLoading ? <Spinner /> : "Register"}
			</Button>
		</form>
	);
};

export default Register;
