import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Box, Button, Typography } from "@mui/joy";

const Home = () => {
  const { userId, handleLogOut } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "94dvh",
        maxWidth: "100%",
        px: 2,
      }}
    >
      <Box
        component="main"
        sx={{
          my: "auto",
          py: 2,
          pb: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
          maxWidth: "100%",
          mx: "auto",
          borderRadius: "sm",
          "& form": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
        }}
      >
        <div>
          <Typography component="h1" fontSize="xl2" fontWeight="lg">
            Welcome back
          </Typography>
          <Typography level="body2" sx={{ my: 1, mb: 3 }}>
            Your ID is: <span>{userId}</span>
          </Typography>
        </div>

        <Button color="danger" onClick={handleLogOut} fullWidth>
          Log out
        </Button>
      </Box>
      <Box component="footer" sx={{ py: 3 }}>
        <Typography level="body3" textAlign="center">
          © Wawe {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
