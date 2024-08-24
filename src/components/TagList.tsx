import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { Tags } from "../config/default";

export default function TagList() {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <div>
        <Typography level="title-lg" id="fav-movie" mb={2}>
          Favorite Movies
        </Typography>
        <Box
          role="group"
          aria-labelledby="fav-movie"
          sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
        >
          {Tags.map(({ title, color }) => {
            const checked = selected.includes(title);
            return (
              <Chip
                key={title}
                variant="plain"
                color={checked ? "primary" : color}
                startDecorator={
                  checked && (
                    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
                  )
                }
              >
                <Checkbox
                  variant="outlined"
                  color={checked ? "primary" : "neutral"}
                  disableIcon
                  overlay
                  label={title}
                  checked={checked}
                  onChange={(event) => {
                    setSelected((titles) =>
                      !event.target.checked
                        ? titles.filter((n) => n !== title)
                        : [...titles, title]
                    );
                  }}
                />
              </Chip>
            );
          })}
        </Box>
      </div>
    </Box>
  );
}
