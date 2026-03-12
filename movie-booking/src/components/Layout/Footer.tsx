import { Text } from "@salt-ds/core";

const Footer = () => {
	return (
		<footer className='footer'>
			<Text style={{ fontSize: 12 }}>
				© {new Date().getFullYear()} Movie Booking App. All rights reserved.
			</Text>
		</footer>
	);
};

export default Footer;
