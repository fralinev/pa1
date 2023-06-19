import { Link } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <nav>
        <h2>Home</h2>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/users">Users</Link>
        <Link to="/images">Images</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>
      {`welcome ${currentUser.username}, ${currentUser.firstname}`}
    </div>
  );
};
export default Home;
