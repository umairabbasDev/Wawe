import { ChipPropsColorOverrides, ColorPaletteProp } from "@mui/joy";
import { OverridableStringUnion } from "@mui/types";

export const Tags: {
  title: string;
  color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>;
}[] = [
  { title: "Explore", color: "primary" },
  { title: "BlackHat", color: "neutral" },
  { title: "Music", color: "warning" },
  { title: "Embed", color: "primary" },
  { title: "C++", color: "success" },
  { title: "Travel", color: "success" },
  { title: "Hyper reality", color: "danger" },
  { title: "International Politics", color: "warning" },
];
