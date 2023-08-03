import { useState } from "react";
import { Box, Button } from "@mui/joy";
import { BookCard, MainFooter, ModalFarm } from "../components";
import { AddBook } from "../components/ListPage";

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

          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => (
          <BookCard />
        ))}
      </Box>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <MainFooter />

      <ModalFarm open={open} setOpen={setOpen} title="Add your book">
        <AddBook />
      </ModalFarm>
    </Box>
  );
};

export default List;
