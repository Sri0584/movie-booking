import {
	Button,
	H2,
	Input,
	Text,
	FormField,
	FormFieldHelperText,
	FormFieldLabel,
} from "@salt-ds/core";
import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useRegisterMutation } from "../features/auth/usersApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const result = await register({ email, password }).unwrap();
			console.log(result, "result");

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
		}
	};

	return (
		<form onSubmit={handleSubmit} className='register-form'>
			<H2>Register</H2>
			{error && <Text>{error}</Text>}
			{success && <Text>Account created!</Text>}

			<Input
				placeholder='Email'
				value={email}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>
			<FormFieldHelperText>We'll never share your email.</FormFieldHelperText>

			<Input
				placeholder='Password'
				value={password}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<FormFieldHelperText>
				Password must be at least 6 characters.
			</FormFieldHelperText>
			<Button appearance='solid' type='submit'>
				Register
			</Button>
		</form>
	);
};

export default Register;
