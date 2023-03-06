import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
	return (
		<Consumer>
			{(context) => (
				<Route
					{...rest}
					render={(props) => {
						console.log('PrivateRoute: ', context.authenticatedUser);
						return context.authenticatedUser ? (
							<Component {...props} />
						) : (
							<Redirect
								to={{
									pathname: '/signin',
									state: { from: props.location },
								}}
							/>
						);
					}}
				/>
			)}
		</Consumer>
	);
};
