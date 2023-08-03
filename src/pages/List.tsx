import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";
import { BookCard, MainFooter } from "../components";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  date: HTMLInputElement;
  file: HTMLInputElement;
}
interface FileFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const List = () => {
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
            Upload File
          </Typography>
          <Typography level="body2" sx={{ my: 1, mb: 3 }}>
            submit recent PDF
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel>Name </FormLabel>
            <Input type="text" name="name" />
          </FormControl>
          <FormControl required>
            <FormLabel>Date</FormLabel>
            <Input type="datetime-local" name="date" />
          </FormControl>
          <FormControl required>
            <FormLabel>File</FormLabel>
            <Input type="file" name="file" />
          </FormControl>
          <Button type="submit" fullWidth>
            upload
          </Button>
        </form>
      </Box>

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

      <MainFooter />
    </Box>
  );
};

export default List;
