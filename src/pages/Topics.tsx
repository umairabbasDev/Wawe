import { Box, Typography } from "@mui/joy";
import TagList from "../components/TagList";

const Topics = () => {
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
            Welcome to Topics page
          </Typography>
          <Typography level="body-md" sx={{ my: 1, mb: 3 }}>
            Let's Look around
          </Typography>

          {/* <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          >
          
           
          </Grid> */}
          <TagList />
        </div>
      </Box>
    </Box>
  );
};

export default Topics;
