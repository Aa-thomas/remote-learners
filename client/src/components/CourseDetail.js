import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const CourseDetail = () => {
	const params = useParams();
	const [course, setCourse] = useState([]);

	useEffect(() => {
		axios(config.apiBaseUrl + `/courses/${params.id}`).then((result) => {
			setCourse(result.data);
			console.log(result.data);
		});
	}, []);
	return (
		<>
			<div class="actions--bar">
				<div class="wrapper">
					<a class="button" href="update-course.html">
						Update Course
					</a>
					<a class="button" href="#">
						Delete Course
					</a>
					<a class="button button-secondary" href="index.html">
						Return to List
					</a>
				</div>
			</div>

			<div class="wrap">
				<h2>Course Detail</h2>
				<form>
					<div class="main--flex">
						<div>
							<h3 class="course--detail--title">Course</h3>
							<h4 class="course--name">{course.title}</h4>
							<p>
								By {course.User?.firstName} {course.User?.lastName}
							</p>

							<p>{course.description}</p>
						</div>
						<div>
							<h3 class="course--detail--title">Estimated Time</h3>
							<p>{course.estimatedTime}</p>

							<h3 class="course--detail--title">Materials Needed</h3>
							<ul class="course--detail--list">
								<li>{course.materialsNeeded}</li>
							</ul>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CourseDetail;
