import 'styles/App.css';
import { useEffect } from 'react';
import axios from 'axios';
import Courses from 'components/Courses';
import { Route, Routes } from 'react-router-dom';
import CreateCourse from 'components/CreateCourse';
import UpdateCourse from 'components/UpdateCourse';
import CourseDetail from 'components/CourseDetail';
import UserSignIn from 'components/UserSignIn';
import UserSignOut from 'components/UserSignOut';
import UserSignUp from 'components/UserSignUp';

function App() {
	useEffect(() => {
		axios('http://localhost:5000/api/users').then((result) =>
			console.log(result)
		);
	});

	return (
		<div className="App">
			<p>hello</p>
			<Routes>
				<Route path="/" element={<Courses />} />
				<Route path="/courses/create" element={<CreateCourse />} />
				<Route path="/courses/:id/update" element={<UpdateCourse />} />
				<Route path="/courses/:id" element={<CourseDetail />} />
				<Route path="/signin" element={<UserSignIn />} />
				<Route path="/signup" element={<UserSignUp />} />
				<Route path="/signout" element={<UserSignOut />} />
			</Routes>
		</div>
	);
}

export default App;
