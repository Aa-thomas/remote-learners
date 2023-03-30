import config from './config';
import axios from 'axios';

const Data = () => {
	const api = async (
		path,
		method = 'GET',
		requiresAuth = false,
		data = null
	) => {
		let requestConfig = {
			url: config.apiBaseUrl + path,
			method,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			data,
		};

		// if (method === 'PUT') {
		// 	const proxyServer = 'https://cors-anywhere.herokuapp.com/';
		// 	requestConfig.url = proxyServer + config.apiBaseUrl + path;
		// 	console.log('helooooooo');
		// }

		if (requiresAuth) {
			requestConfig.auth = {
				username: data.email,
				password: data.password,
			};
		}

		return axios(requestConfig);
	};

	const getUser = async (email, password) => {
		const response = await api(`/users`, 'GET', true, {
			email,
			password,
		});
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	};

	const createUser = async (user) => {
		const response = await api(`/users`, 'POST', false, user);
		if (response.status === 201) {
			return [];
		} else if (response.status === 400) {
			return response.json().then((data) => {
				return data.errors;
			});
		} else {
			throw new Error();
		}
	};

	const createCourse = async (course) => {
		console.log('createCourse', course);
		const response = await api(`/courses`, 'POST', true, course);
		if (response.status === 201) {
			return [];
		} else if (response.status === 400) {
			return response.json().then((data) => {
				return data.errors;
			});
		} else {
			throw new Error();
		}
	};

	const getCourse = async (course) => {
		console.log('getCourse', course);
		const response = await api(`/users`, 'GET', true, {
			course,
		});
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 401) {
			return null;
		} else {
			throw new Error();
		}
	};

	const updateCourse = async (course) => {
		const response = await api(`/courses/${course.id}`, 'PUT', true, course);
		console.log('updateCourse', response);
		if (response.status === 204) {
			return [];
		} else if (response.status === 400) {
			return response.json().then((data) => {
				return data.errors;
			});
		} else {
			throw new Error();
		}
	};

	const deleteCourse = async (courseId, authUser) => {
		const response = await api(
			`/courses/${courseId}`,
			'DELETE',
			true,
			authUser
		);
		if (response !== 204) {
			return response.data;
		}
		return null;
	};

	return {
		api,
		getUser,
		createUser,
		createCourse,
		getCourse,
		updateCourse,
		deleteCourse,
	};
};

export default Data;
