import { Modal, ModalClose, Typography, Sheet } from "@mui/joy";

const BasicModal = ({
  open,
  setOpen,
  children,
  title,
  closeOn = "closeClick",
}: {
  open: boolean;
  setOpen: (arg0: boolean) => void;
  children: JSX.Element;
  title: string;
  closeOn?: "backdropClick" | "closeClick" | "bothClick";
}) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={(
        _event: React.MouseEvent<HTMLButtonElement>,
        reason: string
      ) => {
        switch (closeOn) {
          case "backdropClick":
            if (reason === closeOn) {
              setOpen(false);
            }
            break;
          case "closeClick":
            if (reason === closeOn) {
              setOpen(false);
            }
            break;
          default:
            setOpen(false);
        }
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose
          variant="outlined"
          sx={{
            top: "calc(-1/4 * var(--IconButton-size))",
            right: "calc(-1/4 * var(--IconButton-size))",
            boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
            borderRadius: "50%",
            bgcolor: "background.surface",
          }}
        />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {title}
        </Typography>
        {children}
      </Sheet>
    </Modal>
  );
};

export default BasicModal;