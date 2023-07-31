import { Avatar, Box, Typography } from "@mui/joy";
// import { Link } from "react-router-dom";
import ColorSchemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav>
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            fontWeight="lg"
            mx={2}
            sx={{ color: "var(--primary-color)" }}
            level="h1"
            startDecorator={<img src="./headphones.png" alt="site logo" />}
          >
            Wawe
          </Typography>
          <Box>
            {/* <Link to="/" style={{ padding: 5 }}>
              Home
            </Link>
            <Link to="/about" style={{ padding: 5 }}>
              About
            </Link> */}
          </Box>
        </Box>
        <Box
        mx={2}
          sx={{
            width:"100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ColorSchemeToggle />
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
            color="neutral"
            variant="solid"
          />
        </Box>
      </Box>
    </nav>
  );
};

export default NavBar;
