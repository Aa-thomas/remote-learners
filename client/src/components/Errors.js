import { Link } from 'react-router-dom';

export const NotFound = () => (
	<div>
		<h1>Not Found</h1>
		<p>Sorry! We couldn't find the page you're looking for.</p>
		<Link to="/courses">Back to courses</Link>
	</div>
);

export const Forbidden = () => {
	return (
		<div className="wrapper">
			<h2>Forbidden</h2>
			<p>You don't have permission to access this page.</p>
			<div className="forbidden-buttons">
				<Link to="/signin">Sign In</Link>{' '}
				<Link to="/courses">Back to courses</Link>
			</div>
		</div>
	);
};

export const UnhandledError = () => {
	return (
		<div className="wrapper">
			<h2>Error</h2>
			<p>Sorry! We just encountered an unexpected error.</p>
			<Link to="/courses">Back to courses</Link>
		</div>
	);
};
