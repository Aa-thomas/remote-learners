import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { withContext } from 'context/UserContext';
import Form from './Form';

const UserSignUp = ({ context, history }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmedPassword: '',
		errors: [],
	});

	const { firstName, lastName, email, password, confirmedPassword, errors } =
		formData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		// New user payload
		const user = {
			firstName,
			lastName,
			email,
			password,
			confirmedPassword,
		};

		context.data
			.createUser(user)
			.then(() => {
				console.log(
					`${email} is successfully signed up and authenticated!`
				);
				context.actions.signIn(email, password).then(() => {
					navigate('/');
				});
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
					console.log('Sign up failed', err);
				}
			});
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<div className="wrapper">
			<div className="form--centered">
				<h1>Sign Up</h1>
				<Form
					cancel={handleCancel}
					errors={errors}
					submit={(e) => handleSubmit(e)}
					submitButtonText="Sign Up"
					elements={() => (
						<>
							<div className="name-flex">
								{' '}
								<input
									id="firstName"
									name="firstName"
									type="text"
									value={firstName}
									onChange={(e) => handleChange(e)}
									placeholder="First Name"
								/>
								<input
									id="lastName"
									name="lastName"
									type="text"
									value={lastName}
									onChange={(e) => handleChange(e)}
									placeholder="Last Name"
								/>
							</div>
							<input
								id="email"
								name="email"
								type="text"
								value={email}
								onChange={(e) => handleChange(e)}
								placeholder="Email"
							/>
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => handleChange(e)}
								placeholder="Password"
							/>
							<input
								id="confirmedPassword"
								name="confirmedPassword"
								type="password"
								value={confirmedPassword}
								onChange={(e) => handleChange(e)}
								placeholder="confirmedPassword"
							/>
						</>
					)}
				/>
				<p>
					Already have a user account? <Link to="/signin">Click here</Link>{' '}
					to sign in!
				</p>
			</div>
		</div>
	);
};

export default withContext(UserSignUp);
