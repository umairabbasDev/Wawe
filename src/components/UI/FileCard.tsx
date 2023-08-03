import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

export default function FileCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        transition: "transform 0.3s, border 0.3s",
        "&:hover": {
          borderColor: "var(--primary-color)",
          transform: "translateY(-2px)",
          boxShadow: "1px 0px 10px 0px var(--primary-color)",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body1">Yosemite National Park</Typography>
        <Typography level="body2">California</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body3" fontWeight="md" textColor="text.secondary">
            6.3k views
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body4" fontWeight="md" textColor="text.secondary">
            1 hour ago
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
