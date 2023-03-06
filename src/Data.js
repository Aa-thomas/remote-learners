import { createContext, useState } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const Context = createContext();

const Provider = ({ children }) => {
	const [data] = useState(Data());
	const [cookie] = useState(Cookies.get('authenticatedUser'));
	const [authenticatedUser, setAuthenticatedUser] = useState(
		cookie ? JSON.parse(cookie) : null
	);

	const signIn = async (email, password) => {
		const user = await data.getUser(email, password);

		if (user !== null) {
			setAuthenticatedUser(user);
			Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
			return user;
		}
	};

	const signOut = () => {
		setAuthenticatedUser(null);
		Cookies.remove('authenticatedUser');
	};

	const value = {
		authenticatedUser,
		data,
		actions: {
			signIn,
			signOut,
		},
	};

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

const Consumer = Context.Consumer;

const withContext = (Component) => {
	return function ContextComponent(props) {
		return (
			<Context.Consumer>
				{(context) => <Component {...props} context={context} />}
			</Context.Consumer>
		);
	};
};

export { Provider, Consumer, withContext };
