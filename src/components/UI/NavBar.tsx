import { Box, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import ColorSchemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav style={{ margin: 10 }}>
      <Box
        component="header"
        sx={{
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          fontWeight="lg"
          startDecorator={
            <Box
              component="span"
              sx={{
                width: 24,
                height: 24,
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                borderRadius: "50%",
                boxShadow: (theme) => theme.shadow.md,
                "--joy-shadowChannel": (theme) =>
                  theme.vars.palette.primary.mainChannel,
              }}
            />
          }
        >
          Logo
          <Box>
            <Link to="/" style={{ padding: 5 }}>
              Home
            </Link>
            <Link to="/about" style={{ padding: 5 }}>
              About
            </Link>
          </Box>
        </Typography>

        <ColorSchemeToggle />
      </Box>
    </nav>
  );
};

export default NavBar;
