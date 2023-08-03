import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import { FileFormElement } from "./type";

const AddBook = () => {
  const handleSubmit = (e: React.FormEvent<FileFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      date: formElements.date.value,
      file: formElements.file.files && formElements.file.files[0],
    };
    console.log(data);
  };

  return (
    <>
      <Typography id="modal-desc" textColor="text.tertiary">
        Make sure to use correct information, the file should not a stolen ,
        also <b>Mention necessary Person</b>
      </Typography>

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
        <form onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel>Name </FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Name of book or file "
            />
          </FormControl>
          <FormControl required>
            <FormLabel>About</FormLabel>
            <Textarea
              minRows={2}
              name="about"
              placeholder="description about the book"
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <FormControl required>
              <FormLabel>Date of publish </FormLabel>
              <Input type="date" name="date" />
            </FormControl>
            <FormControl required>
              <FormLabel>Writer</FormLabel>
              <Input type="text" name="writer" placeholder="Original Writer" />
            </FormControl>
          </Box>

          <FormControl required>
            <FormLabel>File</FormLabel>
            <Input type="file" name="file" />
          </FormControl>
          <Button type="submit" fullWidth>
            upload
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddBook;
