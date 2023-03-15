import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../Form';
import axios from 'axios';
import config from '../../config';

const UpdateCourse = ({ context }) => {
	console.log(context);
	const params = useParams();
	const navigate = useNavigate();

	const [course, setCourse] = useState([]);
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
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = () => {
		// New course payload
		const course = {
			title,
			description,
			estimatedTime,
			materialsNeeded,
			id: params.id,
			userId: authenticatedUser.id,
			email: authenticatedUser.email,
			password: authenticatedUser.password,
		};

		context.data
			.updateCourse(course)
			.then(() => {
				console.log(`${title} is successfully updated!`);
				navigate(`/courses/${params.id}`);
			})
			.catch((err) => {
				// handle rejected promises
				if (err.response?.status === 400) {
					setFormData((prevState) => ({
						...prevState,
						errors: err.response.data.errors,
					}));
					console.log('Update course failed', err.response.data);
				} else if (err.response?.status === 404) {
					navigate('/notfound');
				} else if (err.response?.status === 403) {
					navigate('/forbidden');
				} else {
					console.log('error', err);
					navigate('/error');
				}
			});
	};

	const handleCancel = () => {
		navigate('/courses');
	};

	useEffect(() => {
		axios(config.apiBaseUrl + `/courses/${params.id}`)
			.then((result) => {
				setCourse(result.data);
				setFormData((prevState) => ({
					...prevState,
					title: result.data.title,
					description: result.data.description,
					estimatedTime: result.data.estimatedTime,
					materialsNeeded: result.data.materialsNeeded,
				}));
				console.log(result.data);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					navigate('/notfound');
				} else if (err.response.status === 403) {
					navigate('/forbidden');
				} else {
					navigate('/error');
				}
			});
	}, [params.id, navigate]);

	return (
		<>
			<div className="wrapper">
				<h2>Update Course</h2>
				<Form
					cancel={handleCancel}
					errors={errors}
					submit={handleSubmit}
					submitButtonText="Update Course"
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

									<label htmlFor="description">
										Course Description
									</label>
									<textarea
										id="description"
										name="description"
										onChange={handleChange}
										value={description}>
										{course.description}
									</textarea>
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
										value={materialsNeeded}
									/>
								</div>
							</div>
						</>
					)}
				/>
			</div>
		</>
	);
};

export default UpdateCourse;
