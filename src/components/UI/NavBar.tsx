import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import { Link as JoyLink } from "@mui/joy";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

import Tooltip from "@mui/joy/Tooltip";
import Drawer from "@mui/joy/Drawer";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ColorSchemeToggle from "./ThemeToggle";
import NavDropDown from "./NavDropDown";
import { AuthContext } from "../../context/Auth";
import NavItems from "./NavItems";
import NavLogo from "./NavLogo";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import NAV from "../../config/nav";
import { Link } from "react-router-dom";

// import Navigation from "./Navigation";

export default function NavBar() {
  const { handleLogOut } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <NavLogo />

        <List
          aria-labelledby="nav-list-browse"
          size="sm"
          sx={{
            "--ListItem-radius": "8px",
            display: "flex",
            flexDirection: "row",
            "& .JoyListItemButton-root": { p: "8px" },
            // background: "orange",
          }}
        >
          {NAV.map(({ link, name }) => (
            <ListItem key={link}>
              <Link to={link}>
                <JoyLink underline="none">
                  <ListItemButton>
                    <ListItemDecorator>
                      <FolderRoundedIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>{name}</ListItemContent>
                  </ListItemButton>
                </JoyLink>
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Box sx={{ display: { xs: "inline-flex", sm: "none" } }}>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>
            <NavLogo />
          </DialogTitle>
          <Box sx={{ px: 1 }}>
            <NavItems />
          </Box>
        </Drawer>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.level1" }}
            >
              <Typography level="title-sm" textColor="text.icon">
                ⌘ K
              </Typography>
            </IconButton>
          }
          sx={{
            alignSelf: "center",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
          }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <Tooltip title="Joy UI overview" variant="outlined">
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            component="a"
            href="/blog/first-look-at-joy/"
            sx={{ alignSelf: "center" }}
          >
            <BookRoundedIcon />
          </IconButton>
        </Tooltip>
        <ColorSchemeToggle />
        <NavDropDown handleLogOut={handleLogOut} />
      </Box>
    </Box>
  );
}
