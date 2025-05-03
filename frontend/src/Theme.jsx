// src/Theme.jsx
import React, { createContext, useContext, useMemo, useState } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";

const ThemeContext = createContext();

// Export hook separately but keep default export for the component file
export const useThemeContext = () => useContext(ThemeContext);

// Enhanced design tokens for stronger theme visuals
const getDesignTokens = (mode, primaryColor) => ({
  palette: {
    mode,
    primary: { main: primaryColor },
    secondary: { main: "#9c27b0" },
    background: {
      default: mode === "light" ? "#f5f5f5" : "#121212",
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",
    },
    text: {
      primary: mode === "light" ? "#000000" : "#ffffff",
      secondary: mode === "light" ? "#555555" : "#cccccc",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: primaryColor,
        },
      },
    },
  },
});

const Themes = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#1976d2");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode, primaryColor)),
    [mode, primaryColor]
  );

  return (
    <ThemeContext.Provider
      value={{ mode, toggleColorMode, changePrimaryColor, primaryColor }}
    >
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};


export default Themes;
