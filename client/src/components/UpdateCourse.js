import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const UpdateCourse = ({ context }) => {
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

	const { email, password, authenticatedUser } = context;

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
			email,
			password,
		};

		context.actions
			.updateCourse(course)
			.then(() => {
				console.log(`${title} is successfully updated!`);
				navigate('/');
			})
			.catch((err) => {
				// handle rejected promises
				if (err.response?.status === 400) {
					setFormData((prevState) => ({
						...prevState,
						errors: err.response.data.errors,
					}));
					console.log('Update course failed', err.response.data);
				} else {
					console.log('Update course failed', err);
				}
			});
	};

	const handleCancel = () => {
		navigate('/');
	};

	useEffect(() => {
		context.data
			.getCourse()
			.then((course) => {
				setFormData((prevState) => ({
					...prevState,
					title: course.title,
					description: course.description,
					estimatedTime: course.estimatedTime,
					materialsNeeded: course.materialsNeeded,
				}));
				console.log('Get course succeeded', course);
			})
			.catch((err) => {
				// handle rejected promises
				if (err.response?.status === 400) {
					setFormData((prevState) => ({
						...prevState,
						errors: err.response.data.errors,
					}));
					console.log('Get course failed', err.response.data);
				} else {
					console.log('Get course failed', err);
				}
			});
	}, []);

	console.log('context', context);

	return (
		<>
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

								<label htmlFor="description">Course Description</label>
								<textarea
									id="description"
									name="description"
									onChange={handleChange}
									value={description}>
									High-end furniture projects are great to dream about.
									But unless you have a well-equipped shop and some
									serious woodworking experience to draw on, it can be
									difficult to turn the dream into a
									reality.&#13;&#13;Not every piece of furniture needs
									to be a museum showpiece, though. Often a simple
									design does the job just as well and the experience
									gained in completing it goes a long way toward making
									the next project even better.&#13;&#13;Our pine
									bookcase, for example, features simple construction
									and it's designed to be built with basic woodworking
									tools. Yet, the finished project is a worthy and
									useful addition to any room of the house. While it's
									meant to rest on the floor, you can convert the
									bookcase to a wall-mounted storage unit by leaving
									off the baseboard. You can secure the cabinet to the
									wall by screwing through the cabinet cleats into the
									wall studs.&#13;&#13;We made the case out of
									materials available at most building-supply dealers
									and lumberyards, including 1/2 x 3/4-in. parting
									strip, 1 x 2, 1 x 4 and 1 x 10 common pine and
									1/4-in.-thick lauan plywood. Assembly is quick and
									easy with glue and nails, and when you're done with
									construction you have the option of a painted or
									clear finish.&#13;&#13;As for basic tools, you'll
									need a portable circular saw, hammer, block plane,
									combination square, tape measure, metal rule, two
									clamps, nail set and putty knife. Other supplies
									include glue, nails, sandpaper, wood filler and
									varnish or paint and shellac.&#13;&#13;The
									specifications that follow will produce a bookcase
									with overall dimensions of 10 3/4 in. deep x 34 in.
									wide x 48 in. tall. While the depth of the case is
									directly tied to the 1 x 10 stock, you can vary the
									height, width and shelf spacing to suit your needs.
									Keep in mind, though, that extending the width of the
									cabinet may require the addition of central shelf
									supports.
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
									value={materialsNeeded}>
									* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2
									common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1
									x 10 common pine&#13;&#13;* 1/4 inch thick lauan
									plywood&#13;&#13;* Finishing Nails&#13;&#13;*
									Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood
									Filler&#13;&#13;* Minwax Oil Based Polyurethane
								</textarea>
							</div>
						</div>
					</>
				)}
			/>
		</>
	);
};

export default UpdateCourse;
