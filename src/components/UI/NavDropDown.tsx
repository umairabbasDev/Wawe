import { Avatar } from "@mui/joy";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListDivider from "@mui/joy/ListDivider";
import MenuButton from "@mui/joy/MenuButton";
import Dropdown from "@mui/joy/Dropdown";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function NavDropDown({
  handleLogOut,
}: {
  handleLogOut: () => void;
}) {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        size="sm"
        sx={{
          maxWidth: "32px",
          maxHeight: "32px",
          borderRadius: "9999999px",
        }}
      >
        <Avatar
          src="https://i.pravatar.cc/40?img=2"
          srcSet="https://i.pravatar.cc/80?img=2"
          sx={{ maxWidth: "32px", maxHeight: "32px" }}
        />
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{
          zIndex: "99999",
          p: 1,
          gap: 1,
          "--ListItem-radius": "var(--joy-radius-sm)",
        }}
      >
        <MenuItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/40?img=2"
              srcSet="https://i.pravatar.cc/80?img=2"
              sx={{ borderRadius: "50%" }}
            />
            <Box sx={{ ml: 1.5 }}>
              <Typography level="title-sm" textColor="text.primary">
                Rick Sanchez
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                rick@email.com
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <ListDivider />
        <MenuItem>
          <HelpRoundedIcon />
          Help
        </MenuItem>
        <MenuItem>
          <SettingsRoundedIcon />
          Settings
        </MenuItem>
        <ListDivider />
        <MenuItem component="a" href="/blog/first-look-at-joy/">
          First look at Joy UI
          <OpenInNewRoundedIcon />
        </MenuItem>
        <MenuItem
          component="a"
          href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
        >
          Sourcecode
          <OpenInNewRoundedIcon />
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleLogOut}>
          <LogoutRoundedIcon />
          Log out
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
