import 'styles/App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Courses from 'components/Courses';
import { Route, Routes } from 'react-router-dom';
import CreateCourse from 'components/CreateCourse';
import UpdateCourse from 'components/UpdateCourse';
import CourseDetail from 'components/CourseDetail';
import UserSignIn from 'components/UserSignIn';
import UserSignOut from 'components/UserSignOut';
import UserSignUp from 'components/UserSignUp';
import { NotFound, Forbidden, UnhandledError } from 'components/Errors';
import Header from 'components/Header';
import { withContext } from 'context/UserContext';
import PrivateRoute from 'components/PrivateRoute';
import config from 'config';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);
const UpdateCourseWithContext = withContext(UpdateCourse);

function App() {
	return (
		<>
			<HeaderWithContext />
			<main>
				<div className="wrapper">
					<Routes>
						{/* <Route path="/" element={<Home />} /> */}
						<Route path="/courses" element={<Courses />} />
						<Route
							path="/courses/create"
							element={
								<PrivateRouteWithContext>
									<CreateCourse />
								</PrivateRouteWithContext>
							}
						/>
						<Route
							path="/courses/:id/update"
							element={
								<PrivateRouteWithContext>
									<UpdateCourseWithContext />
								</PrivateRouteWithContext>
							}
						/>
						<Route path="/courses/:id" element={<CourseDetail />} />
						<Route path="/signin" element={<UserSignInWithContext />} />
						<Route path="/signup" element={<UserSignUpWithContext />} />
						<Route path="/signout" element={<UserSignOutWithContext />} />
						<Route path="/forbidden" element={<Forbidden />} />
						<Route path="/error" element={<UnhandledError />} />
						<Route path="/*" element={<NotFound />} />
					</Routes>
				</div>
			</main>
		</>
	);
}

export default App;
