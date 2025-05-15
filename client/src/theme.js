import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    button: {
      textTransform: "none", // Optional: prevents all caps
      fontWeight: 500,
    },
    body1: {
      fontWeight: "300",
      fontSize: "16px",
      lineHeight: "28px",
      letterSpacing: "0.25px",
      verticalAlign: "middle",
      color: "#414042"
    },
    body2: {
      color: "#414042",
      fontWeight: "300",
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0.25px",
      verticalAlign: "middle",
    },
    caption: {

    },
    subtitle1: {

    },
    subtitle2: {
      color: "#4A7C59",
      fontWeight: "300",
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "3px",
      verticalAlign: "middle",
      textTransform: "uppercase",
    },
  },
  palette: {
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#4A7C59",
      secondary: "#B0B0B0",
    },
    primary: {
      main: "#414042",
      contrastText: "#FFFFFF", // Text color on green buttons
    },
    secondary: {
      main: "#F4C430", // Yellow
      contrastText: "#000000",
    },
    grey: {
      500: "#B0B0B0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          fontFamily: "Roboto, sans-serif",
          fontWeight: "300",
          boxShadow: "none",
          height: "fit-content",
        },
        textPrimary: {
          backgroundColor: "unset",
          color: "#414042",
          fontSize: "14px",
          letterSpacing: "2px",
          "&:hover": {
            backgroundColor: "unset",
            boxShadow: "none",
            color: "#4A7C59"
          },
        },
        containedPrimary: {
          backgroundColor: "#4A7C59",
          color: "#FFFFFF",
          borderRadius: "3px",
          lineHeight: "10px",
          letterSpacing: "2px",
          padding: "8px",
          fontWeight: "400",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#4A7C59",
            boxShadow: "none",
            color: "#FFFFFF"
          },
        },
        containedSecondary: {
          backgroundColor: "#F4C430",
          color: "#000000",
          letterSpacing: "2px",
          borderRadius: "0px 20px",
          textTransform: "uppercase",
          fontSize: "14px",
          "&:hover": {
            backgroundColor: "#e6b327",
            boxShadow: "none"
          },
        },
      },
    },
  },
});

export default theme;
