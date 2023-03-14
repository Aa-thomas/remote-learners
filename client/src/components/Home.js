import { Link } from "react-router-dom";

const Home = () => {
  return (
<header className="home-header">
   <h1>Remote Learners</h1>
   <p>Learn from anywhere, anytime.</p>
   <Link to='/courses'>View our courses</Link>
</header>
  )
}

export default Home
