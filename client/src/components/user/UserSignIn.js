import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../Form';

const UserSignIn = ({ context, location = { state: null } }) => {
	const navigate = useNavigate();
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
		// If a previous location state exists redirect the user there, otherwise redirect to home page
		// const { from } = location.state
		// 	? location.state
		// 	: {
		// 			pathname: '/',
		// 	  };

		context.actions
			.signIn(email, password)
			.then(() => {
				console.log(`${email} is successfully signed in!`);
				navigate('/');
			})
			.catch((err) => {
				// handle rejected promises
				if (err.response?.status === 400) {
					setFormData((prevState) => ({
						...prevState,
						errors: err.response.data.errors,
					}));
					console.log('Sign up failed', err.response.data);
				} else {
					navigate('/error');
					console.log('Sign up failed', err);
				}
			});
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<>
			<div className="form--centered">
				<h2>Sign In</h2>
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
								placeholder="Email"
								required
							/>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={handleChange}
								placeholder="Password"
								required
							/>
						</>
					)}
				/>
				<p>
					Don't have a user account? <Link to="/signup">Click here</Link>{' '}
					to sign up!
				</p>
			</div>
		</>
	);
};

export default UserSignIn;
