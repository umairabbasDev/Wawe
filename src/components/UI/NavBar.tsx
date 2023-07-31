import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ margin: 10 }}>
      <Link to="/" style={{ padding: 5 }}>
        Home
      </Link>
      <Link to="/about" style={{ padding: 5 }}>
        About
      </Link>
    </nav>
  );
};

export default NavBar;
