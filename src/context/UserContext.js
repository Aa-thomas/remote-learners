import { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = () => {
	const [user, setUser] = useState(null);

	const signInUser = (email, password) => {
		const newUser = { email, password };
		setUser(newUser);
	};

	const signOutUser = () => {
		setUser(null);
	};

	const value = {
		user,
		actions: {
			signIn: signInUser,
			signOut: signOutUser,
		},
	};
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContext;
