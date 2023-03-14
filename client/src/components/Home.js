import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="home-header">
			<div className="wrapper">
				<h1>Remote Learners</h1>
				<p>Learn from anywhere, anytime.</p>
				<Link to="/courses">View our courses</Link>
			</div>
		</div>
	);
};

export default Home;
