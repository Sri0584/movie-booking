import { FlexLayout, Text, Button } from "@salt-ds/core";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../app/authSlice";

const Header = () => {
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<header className='header'>
			<FlexLayout justify='space-between' align='center'>
				<Link to='/' style={{ textDecoration: "none" }}>
					<Text style={{ fontSize: 22, fontWeight: 600 }}>
						🎬 Movie Booking
					</Text>
				</Link>

				<FlexLayout gap={2}>
					{isAuthenticated && user ? (
						<>
							<Text>{user.email}</Text>
							<Button appearance='transparent' onClick={handleLogout}>
								Logout
							</Button>
						</>
					) : (
						<>
							<Link to='/login'>
								<Button appearance='transparent'>Login</Button>
							</Link>
							<Link to='/register'>
								<Button appearance='transparent'>Register</Button>
							</Link>
						</>
					)}
				</FlexLayout>
			</FlexLayout>
		</header>
	);
};

export default Header;

