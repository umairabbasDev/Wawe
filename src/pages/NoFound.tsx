import { Stack, Link as JoyLink } from "@mui/joy";
import { Link } from "react-router-dom";

const NoFound = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <img src="/not_found.svg" alt="not found " height="30%" width="30%" />
      <h2>Page Not Found</h2>
      <p>Sorry for Inconvenience </p>
      <Link to="/">
        <JoyLink>Go to Home</JoyLink>
      </Link>
    </Stack>
  );
};

export default NoFound;
