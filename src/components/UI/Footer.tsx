import { Box, Typography } from "@mui/joy";

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Typography level="body3" textAlign="center">
        © Wawe {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
