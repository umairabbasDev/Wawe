// import { useContext } from "react";
// import { AuthContext } from "../context/Auth";
import { Box, Button, Typography } from "@mui/joy";

const Home = () => {
  // const { userId, handleLogOut } = useContext(AuthContext);

  return (
    <Box
      sx={(theme) => ({
        width:
          "clamp(100vw , (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
        transition: "width var(--Transition-duration)",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        position: "relative",
        zIndex: 1,
        display: "flex",
        [theme.getColorSchemeSelector("dark")]: {
          backgroundColor: "rgba(19 19 24 / 0.4)",
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          width:
            "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
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
            {/* <Typography component="h1" fontSize="xl2" fontWeight="lg">
              Sign in to your account
            </Typography> */}
            <Typography level="body2" sx={{ my: 1, mb: 3 }}>
              Welcome back
            </Typography>
          </div>

          <Button type="submit" fullWidth>
            Click here
          </Button>
        </Box>
        <Box component="footer" sx={{ py: 3 }}>
          <Typography level="body3" textAlign="center">
            © Wawe {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

// <section>
//   <h5>
//     Your ID is: <span>{userId}</span>
//   </h5>
//   <button className="btn-logout" onClick={handleLogOut}>
//     Log out
//   </button>
// </section>
