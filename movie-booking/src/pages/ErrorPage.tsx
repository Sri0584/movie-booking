import { H1, Text, Button } from "@salt-ds/core";
import {
	useRouteError,
	isRouteErrorResponse,
	useNavigate,
} from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	let errorMessage = "An unexpected error occurred";
	let errorStatus = 500;

	if (isRouteErrorResponse(error)) {
		errorStatus = error.status;
		errorMessage = error.statusText || error.data?.message || errorMessage;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	}

	return (
		<main className='error-page' aria-label='Error page' aria-labelledby='Error page' role='alert' aria-live='assertive' aria-atomic='true'>
			<H1 aria-label='Error status' aria-labelledby='Error status'>{errorStatus}</H1>
			<Text aria-label='Error message' aria-labelledby='Error message'>
				<strong aria-label='Error message' aria-labelledby='Error message'>{errorMessage}</strong>
			</Text>
			<Button appearance='solid' onClick={() => navigate("/")} aria-label='Back to Home' aria-labelledby='Back to Home'>
				<Text aria-label='Back to Home' aria-labelledby='Back to Home'>Back to Home</Text>
			</Button>
		</main>
	);
}
