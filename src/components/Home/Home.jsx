import { useOutletContext, Link } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  return (
    <main>
      {user ? <p>{user.username}</p> : <p>Loading or not logged in...</p>}
      <Link to="/log-in">Go to Log in Page</Link>
    </main>
  );
}

export default Home;
