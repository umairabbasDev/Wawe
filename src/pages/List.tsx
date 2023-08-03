import { useState } from "react";
import { Box, Button } from "@mui/joy";
import { BookCard, MainFooter, ModalFarm } from "../components";
import { AddBook } from "../components/ListPage";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const List = () => {
  const [open, setOpen] = useState<boolean>(false);

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          my: "2rem",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {[
          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1,
          1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ].map(() => (
          <BookCard />
        ))}
      </Box>
      <Button
        color="primary"
        onClick={() => setOpen(true)}
        size="md"
        variant="solid"
        sx={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          zIndex: "100",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          textAlign: "center",
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 40 }} />
      </Button>
      <MainFooter />

      <ModalFarm open={open} setOpen={setOpen} title="Add your book">
        <AddBook />
      </ModalFarm>
    </Box>
  );
};

export default List;
