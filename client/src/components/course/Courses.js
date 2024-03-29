import {
	Typography,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Container,
	Button,
} from '@mui/material';
import { Chance } from 'chance';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import config from 'config';
import axios from 'axios';

const Courses = ({ context }) => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const chance = new Chance();

	const authUser = context.authenticatedUser;

	useEffect(() => {
		axios(config.apiBaseUrl + '/courses')
			.then((result) => setCourses(result.data))
			.catch((err) => navigate('/error'));
	}, [navigate]);

	return (
		<>
			<div className="wrapper">
				<div className="course--create">
					<h2>Courses</h2>
					{/* Render create course button only when an authorized user is signed in */}
					{authUser && (
						<button class="button">
							<Link to="/courses/create">Create Course</Link>
						</button>
					)}
				</div>
				<Container className="cardGrid" maxWidth="lg">
					<Grid>
						<Grid container spacing={4}>
							{courses.map((course) => (
								<Grid item key={chance.guid()} xs={12} sm={6} md={4}>
									{console.log('course', course)}
									<Card
										className="card"
										sx={{
											backgroundColor: 'rgb(16,16,16)',
											color: 'white',
											boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.2)',
										}}>
										<CardMedia
											className="cardMedia"
											image={course.imageUrl}
											title={'image title'}
										/>
										<CardContent className="cardContent">
											<Typography gutterBottom variant="h5">
												{course.title}
											</Typography>
											<Typography variant="p" className="line-clamp">
												{course.description}
											</Typography>
											<CardActions>
												<Button size="small" color="primary">
													<Link to={`/courses/${course.id}`}>
														View
													</Link>
												</Button>

												{/* Render only if you are the authorized user of this course */}
												{authUser?.id === course.userId && (
													<Button size="small" color="primary">
														<Link
															to={`/courses/${course.id}/update`}>
															Edit
														</Link>
													</Button>
												)}
											</CardActions>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	);
};

export default Courses;
