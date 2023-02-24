import logo from './logo.svg';
import './App.css';
import UserContext from './utilities/UserContext';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
	useEffect(() => {
		axios('http://localhost:5000/api/users').then((result) =>
			console.log(result)
		);
	});

	return <div className="App"></div>;
}

export default App;
