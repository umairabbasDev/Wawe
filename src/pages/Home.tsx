import { Box, Button, Typography } from "@mui/joy";

const Home = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 2,
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
          <Typography level="body-md" sx={{ my: 1, mb: 3 }}>
            Let's Look around
          </Typography>
          <Button fullWidth>Explore</Button>
        </div>
      </Box>
    </Box>
  );
};

export default Home;
