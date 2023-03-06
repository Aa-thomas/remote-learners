import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

const UserSignIn = ({ context, history, location }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		errors: [],
	});

	const { email, password, errors } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		const { from } = location.state || {
			from: {
				pathname: '/authenticated',
			},
		};
		context.actions
			.signIn(email, password)
			.then(() => {
				console.log(`${email} is successfully signed in!`);
				history.push(from);
			})
			.catch((err) => {
				setFormData((prevState) => ({
					...prevState,
					errors: ['Sign-in was unsuccessful'],
				}));
				console.log(err);
			});
	};

	const handleCancel = () => {
		history.push('/');
	};

	return (
		<div className="bounds">
			<div className="grid-33 centered signin">
				<h1>Sign In</h1>
				<Form
					cancel={handleCancel}
					errors={errors}
					submit={handleSubmit}
					submitButtonText="Sign In"
					elements={() => (
						<>
							<input
								id="email"
								name="email"
								type="text"
								value={email}
								onChange={handleChange}
								placeholder="User Name"
							/>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={handleChange}
								placeholder="Password"
							/>
						</>
					)}
				/>
				<p>
					Don't have a user account? <Link to="/signup">Click here</Link>{' '}
					to sign up!
				</p>
			</div>
		</div>
	);
};

export default UserSignIn;
