import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import ReactMarkdown from 'react-markdown';

const CourseDetail = ({ context }) => {
	const navigate = useNavigate();
	const params = useParams();
	const [course, setCourse] = useState([]);

	useEffect(() => {
		axios(config.apiBaseUrl + `/courses/${params.id}`)
			.then((result) => {
				setCourse(result.data);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					navigate('/notfound');
				} else {
					navigate('/error');
				}
			});
	}, []);
	return (
		<>
			<div className="wrapper">
				<div className="actions--bar">
					<div className="wrapper">
						{context.authenticatedUser ? (
							<>
								<button className="button">
									<Link to={`/courses/${params.id}/update`}>
										Update Course
									</Link>
								</button>
								<button className="button">
									<Link to={`/courses/${params.id}/delete`}>
										Delete Course
									</Link>
								</button>
								<button className="button">
									<Link to="/courses">Return to List</Link>
								</button>
							</>
						) : null}
					</div>
				</div>

				<div className="wrap">
					<form>
						<div className="main--flex">
							<div>
								<h3 className="course--detail--title">Course</h3>
								<h4 className="course--name">{course.title}</h4>
								<p>
									By {course.User?.firstName} {course.User?.lastName}
								</p>

								<ReactMarkdown children={course.description} />
							</div>
							<div>
								<h3 className="course--detail--title">
									Estimated Time
								</h3>
								<p>{course.estimatedTime}</p>

								<h3 className="course--detail--title">
									Materials Needed
								</h3>
								<ul className="course--detail--list">
									<ReactMarkdown children={course.materialsNeeded} />
								</ul>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CourseDetail;
