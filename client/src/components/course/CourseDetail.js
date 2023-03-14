import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const CourseDetail = () => {
	const params = useParams();
	const [course, setCourse] = useState([]);

	useEffect(() => {
		axios(config.apiBaseUrl + `/courses/${params.id}`).then((result) => {
			setCourse(result.data);
		});
	}, [params.id]);
	return (
		<>
			<div class="actions--bar">
				<div class="wrapper">
					<Link to={`/courses/${params.id}/update`}>Update Course</Link>
					<Link to={`/courses/${params.id}/delete`}>Delete Course</Link>
					<Link to="/courses">Return to List</Link>
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
