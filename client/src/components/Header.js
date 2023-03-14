import { Link } from 'react-router-dom';

const Header = ({ context }) => {
	const authUser = context.authenticatedUser;
	return (
		<header>
			<div className="wrapper">
				<h1 className="header--logo">Remote Learners</h1>
				<nav>
					{authUser ? ( // if user is signed in, then show the following:
						<>
							<span>
								Welcome, {authUser.firstName} {authUser.lastName}!
							</span>
							<Link className="signout" to="/signout">
								Sign Out
							</Link>
						</>
					) : (
						// if user is signed out, then show the following:
						<>
							<Link className="signup" to="/signup">
								Sign Up
							</Link>
							<Link className="signin" to="/signin">
								Sign In
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
