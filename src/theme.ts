import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  // No custom tokens found, you can skip the theme augmentation.
}

const theme = extendTheme({
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
  colorSchemes: {
    light: {
      palette: {
        warning: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
        },
        primary: {
          "50": "#f7f5fd",
          "100": "#f7f5fd",
          "200": "#f7f5fd",
          "300": "#c7b2ef",
          "400": "#b99ce9",
          "500": "#a274de",
          "600": "#9456d1",
          "700": "#8443be",
          "800": "#6e389f",
          "900": "#5b2f83",
        },

        text: {
          primary: "var(--joy-palette-primary-800)",
          secondary: "var(--joy-palette-primary-700)",
          tertiary: "var(--joy-palette-primary-600)",
          icon: "var(--joy-palette-primary-500)",
        },
        background: {
          body: "var(--joy-palette-primary-50)",
          tooltip: "var(--joy-palette-primary-800)",
        },
      },
    },
    dark: {
      palette: {
        warning: {
          "50": "#fffbeb",
          "100": "#fef3c7",
          "200": "#fde68a",
          "300": "#fcd34d",
          "400": "#fbbf24",
          "500": "#f59e0b",
          "600": "#d97706",
          "700": "#b45309",
          "800": "#92400e",
          "900": "#78350f",
        },
        primary: {
          "50": "#f7f5fd",
          "100": "#f7f5fd",
          "200": "#f7f5fd",
          "300": "#c7b2ef",
          "400": "#b99ce9",
          "500": "#a274de",
          "600": "#9456d1",
          "700": "#8443be",
          "800": "#6e389f",
          "900": "#5b2f83",
        },
        text: {
          primary: "var(--joy-palette-primary-100)",
          icon: "var(--joy-palette-primary-400)",
        },
        background: {
          tooltip: "var(--joy-palette-primary-800)",
        },
      },
    },
  },
});

export default theme;
