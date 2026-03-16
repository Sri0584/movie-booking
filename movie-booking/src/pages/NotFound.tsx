import { H2, Text } from "@salt-ds/core";

export default function NotFound() {
	return (
		<main className='error-page'>
			<H2>404</H2>
			<Text>Page not found</Text>
		</main>
	);
}
