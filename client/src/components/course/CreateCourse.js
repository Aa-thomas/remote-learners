import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Form';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const CreateCourse = ({ context }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
		errors: [],
	});
	const [courseImage, setCourseImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

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

	const uploadImage = () => {
		return new Promise((resolve, reject) => {
			if (courseImage === null) {
				resolve(null);
			} else {
				const imageRef = ref(
					storage,
					`courseImage/${courseImage.name + v4()}`
				);
				uploadBytes(imageRef, courseImage)
					.then(() => {
						return getDownloadURL(imageRef);
					})
					.then((url) => {
						setImageUrl(url); // This is optional, as we will pass the URL directly to handleSubmit.
						resolve(url);
					})
					.catch((error) => {
						console.error('Error uploading image', error);
						reject(error);
					});
			}
		});
	};

	const handleSubmit = () => {
		uploadImage().then((url) => {
			// New course payload
			const course = {
				title,
				imageUrl: url, // Use the URL passed from uploadImage() directly.
				description,
				estimatedTime,
				materialsNeeded,
				email: authenticatedUser.email,
				password: authenticatedUser.password,
			};

			// Create course
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
						navigate('/error');
					}
				});
		});
	};

	return (
		<>
			<div className="wrapper">
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

									<label htmlFor="thumbnail">Thumbnail</label>
									<input
										id="thumbnail"
										name="thumbnail"
										type="file"
										accept="image/png, image/jpeg, .png, .jpeg"
										onChange={(e) => {
											setCourseImage(e.target.files[0]);
										}}
									/>

									<label htmlFor="description">
										Course Description
									</label>
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
			</div>
		</>
	);
};

export default CreateCourse;
