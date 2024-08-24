import { Typography } from "@mui/joy";
import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <Typography
      fontWeight="lg"
      mx={2}
      sx={{ color: "var(--primary-color)" }}
      level="h1"
      startDecorator={
        <Link to="/">
          <img src="./headphones.png" alt="site logo" />
        </Link>
      }
    >
      Wawe
    </Typography>
  );
};

export default NavLogo;
