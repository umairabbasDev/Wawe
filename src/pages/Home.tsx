import { useContext } from "react";
import { AuthContext } from "../context/Auth";

const Home = () => {
  const { userId, handleLogOut } = useContext(AuthContext);

  return (
    <section>
      <h5>
        Your ID is: <span>{userId}</span>
      </h5>
      <button className="btn-logout" onClick={handleLogOut}>
        Log out
      </button>
    </section>
  );
};

export default Home;
