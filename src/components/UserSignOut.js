import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignOut = ({ context }) => {
	const navigate = useNavigate();
	// component calls signOut and updates state after render
	useEffect(() => context.actions.signOut());
	return navigate('/');
};

export default UserSignOut;
