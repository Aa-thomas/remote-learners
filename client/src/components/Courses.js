import {
	Typography,
	AppBar,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	CssBaseline,
	Grid,
	Toolbar,
	Container,
	Button,
} from '@mui/material';
import { Chance } from 'chance';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import config from 'config';
import axios from 'axios';

const Courses = () => {
	const [courses, setCourses] = useState([]);
	const chance = new Chance();
	useEffect(() => {
		axios(config.apiBaseUrl + '/courses').then((result) =>
			setCourses(result.data)
		);
	}, []);

	return (
		<>
			<h1>Courses</h1>
			<Container className="cardGrid" maxWidth="lg">
				<Grid>
					<Grid container spacing={4}>
						{courses.map((course) => (
							<Grid item key={chance.guid()} xs={12} sm={6} md={4}>
								<Card
									className="card"
									sx={{
										backgroundColor: 'rgb(16,16,16)',
										color: 'white',
										boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.2)',
									}}>
									<CardMedia
										className="cardMedia"
										image="https://source.unsplash.com/random"
										title={'image title'}
									/>
									<CardContent className="cardContent">
										<Typography gutterBottom variant="h5">
											{course.title}
										</Typography>
										<Typography variant="p">
											{course.description}
										</Typography>
										<CardActions>
											<Button size="small" color="primary">
												<Link to={`/courses/${course.id}`}>
													View
												</Link>
											</Button>
											<Button size="small" color="primary">
												<Link to={`/courses/${course.id}/update`}>
													Edit
												</Link>
											</Button>
										</CardActions>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Courses;
