import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form';

const CreateCourse = ({ context }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: [],
	});

	const { title, description, estimatedTime, materialsNeeded, errors } =
		formData;

	const { authenticatedUser } = context;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCancel = () => {
		navigate('/courses');
	};

	const handleSubmit = () => {
		// New course payload
		const course = {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			email: authenticatedUser.email,
			password: authenticatedUser.password,
		};

		context.data
			.createCourse(course)
			.then(() => {
				console.log(`${title} is successfully created!`);
				navigate('/courses');
			})
			.catch((err) => {
				// handle rejected promises
				if (err.response?.status === 400) {
					setFormData((prevState) => ({
						...prevState,
						errors: err.response.data.errors,
					}));
					console.log('Create course failed', err.response.data);
				} else {
					console.log('Create course failed', err);
				}
			});
	};

	return (
		<>
			<h2>Create Course</h2>

			<Form
				cancel={handleCancel}
				errors={errors}
				submit={handleSubmit}
				submitButtonText="Create Course"
				elements={() => (
					<>
						<div className="main--flex">
							<div>
								<label htmlFor="title">Course Title</label>
								<input
									id="title"
									name="title"
									type="text"
									value={title}
									onChange={handleChange}
								/>

								<p>
									By{' '}
									{`${authenticatedUser.firstName} ${authenticatedUser.lastName}`}
								</p>

								<label htmlFor="description">Course Description</label>
								<textarea
									id="description"
									name="description"
									onChange={handleChange}
									value={description}></textarea>
							</div>
							<div>
								<label htmlFor="estimatedTime">Estimated Time</label>
								<input
									id="estimatedTime"
									name="estimatedTime"
									type="text"
									value={estimatedTime}
									onChange={handleChange}
								/>

								<label htmlFor="materialsNeeded">
									Materials Needed
								</label>
								<textarea
									id="materialsNeeded"
									name="materialsNeeded"
									onChange={handleChange}
									value={materialsNeeded}></textarea>
							</div>
						</div>
					</>
				)}
			/>
		</>
	);
};

export default CreateCourse;
