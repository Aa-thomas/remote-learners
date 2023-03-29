import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="home-header">
			<div className="wrapper home-header-text">
				<p>Learn from anywhere, anytime.</p>
				<Link to="/courses">View our courses</Link>
			</div>
		</div>
	);
};

export default Home;
