import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const CreateCourse = () => {
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleCancel = () => {
		navigate('/');
	};

	const handleSubmit = () => {};
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
									<label htmlFor="courseTitle">Course Title</label>
									<input
										id="courseTitle"
										name="courseTitle"
										type="text"
										value={title}
										onChange={handleChange}
									/>

									<p>By Joe Smith</p>

									<label htmlFor="courseDescription">
										Course Description
									</label>
									<textarea
										id="courseDescription"
										name="courseDescription"
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
