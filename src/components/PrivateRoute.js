import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ context, children }) => {
	const authUser = context.authenticatedUser;

	return authUser ? children : <Navigate to={'/signin'} />;
};

export default PrivateRoute;
