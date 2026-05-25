import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "#F5ECD5", // main bg
      paper: "#ffffff",
    },

    primary: {
      main: "#626F47", // olive green
    },

    secondary: {
      main: "#A4B465",
    },

    warning: {
      main: "#F0BB78", // accent orange
    },

    text: {
      primary: "#2F2F2F",
      secondary: "#6B7280",
    },
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h3: {
      fontWeight: 600,
      color: "#2F2F2F",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          borderRadius: 16,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#ffffff",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          borderRadius: 20,
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          "& fieldset": {
            borderColor: "rgba(0,0,0,0.1)",
          },

          "&:hover fieldset": {
            borderColor: "#626F47",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#626F47",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
        },

        contained: {
          background: "#626F47",
          color: "#fff",

          "&:hover": {
            background: "#4F5A38",
          },
        },
      },
    },
  },
});

export default theme;