import 'styles/App.css';
import Courses from 'components/course/Courses';
import { Route, Routes } from 'react-router-dom';
import CreateCourse from 'components/course/CreateCourse';
import UpdateCourse from 'components/course/UpdateCourse';
import CourseDetail from 'components/course/CourseDetail';
import UserSignIn from 'components/user/UserSignIn';
import UserSignOut from 'components/user/UserSignOut';
import UserSignUp from 'components/user/UserSignUp';
import { NotFound, Forbidden, UnhandledError } from 'components/Errors';
import Header from 'components/Header';
import { withContext } from 'context/UserContext';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'components/Home';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);

function App() {
	return (
		<>
			<HeaderWithContext />
			<main>
				<div className="wrapper">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/courses" element={<Courses />} />
						<Route
							path="/courses/create"
							element={
								<PrivateRouteWithContext>
									<CreateCourseWithContext />
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
