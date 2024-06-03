// theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default:
        "linear-gradient(106.37deg, #ffe1bc 29.63%, #ffcfd1 51.55%, #f3c6f1 90.85%)",
      paper: "rgba(255, 255, 255, 1)",
    },
    text: {
      primary: "#242d49",
    },
    primary: {
      main: "#fca61f",
    },
    secondary: {
      main: "#ff919d",
    },
  },
  shadows: [
    "none",
    "0px 19px 60px rgb(0 0 0 / 8%)",
    "-79px 51px 60px rgba(0, 0, 0, 0.09)",
  ],
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          "@media (max-width: 900px)": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#fca61f",
          color: "black",
          "&:hover": {
            backgroundColor: "#F8C471",
          },
          "@media (max-width: 900px)": {
            fontSize: "0.65rem",
            padding: "6px 12px",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242d49",
      paper: "#1a1e36",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#fca61f",
    },
    secondary: {
      main: "#ff919d",
    },
  },
  shadows: [
    "none",
    "0px 19px 60px rgb(0 0 0 / 8%)",
    "-79px 51px 60px rgba(0, 0, 0, 0.08)",
  ],
  components: {
    MuiTypography: {
      color: "	#FFFFFF",
      styleOverrides: {
        root: {
          "@media (max-width: 900px)": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#fca61f",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#e5941a",
          },
          "@media (max-width: 900px)": {
            fontSize: "0.65rem",
            padding: "6px 12px",
          },
        },
      },
    },
  },
});
