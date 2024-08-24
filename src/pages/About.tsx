import { Box, Typography } from "@mui/joy";

const About = () => {
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
            About us
          </Typography>
          <Typography level="body-md" sx={{ my: 1, mb: 3 }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
            consequatur voluptatibus ut necessitatibus saepe, qui dolore
            recusandae vero placeat obcaecati unde dicta aliquid. Fugit,
            delectus. Soluta vero inventore ipsum dolor.
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default About;
