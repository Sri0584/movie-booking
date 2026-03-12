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
		<div className='error-page'>
			<H1>{errorStatus}</H1>
			<Text className='m-b-20'>
				<strong>{errorMessage}</strong>
			</Text>
			<Button appearance='solid' onClick={() => navigate("/")}>
				Back to Home
			</Button>
		</div>
	);
}
