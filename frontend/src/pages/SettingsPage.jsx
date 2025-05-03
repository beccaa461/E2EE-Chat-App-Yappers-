import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { useThemeContext } from "../Theme";
import { useTheme } from "@mui/material/styles";

const COLOR_OPTIONS = [
  "#1976d2", // Blue
  "#d32f2f", // Red
  "#388e3c", // Green
  "#f57c00", // Orange
  "#7b1fa2", // Purple
  "#00838f", // Cyan
];

const SettingsPage = () => {
  const { mode, toggleColorMode, changePrimaryColor, primaryColor } = useThemeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: isDark
          ? "radial-gradient(circle at top left, #1a001a, #0d001a)"
          : "linear-gradient(to right, #ffe0f0, #fce4ec)",
        position: "relative",
        overflow: "hidden",
        color: isDark ? "#fff" : "#000",
      }}
    >
      {/* Glitter effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          backgroundImage: isDark
            ? `radial-gradient(circle, #ff69b4 1px, transparent 1px), radial-gradient(circle, #ff1493 1px, transparent 1px)`
            : `radial-gradient(circle, #fff 1px, transparent 1px), radial-gradient(circle, #ffc0cb 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
          opacity: isDark ? 0.1 : 0.3,
          zIndex: 0,
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: isDark ? "#2a0030" : "#fff0f5",
            boxShadow: isDark
              ? "0 0 30px rgba(255, 105, 180, 0.4)"
              : "0 0 30px rgba(255, 182, 193, 0.4)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            App Theme Settings
          </Typography>

          <FormControlLabel
            control={<Switch checked={mode === "dark"} onChange={toggleColorMode} />}
            label="Dark Mode"
            sx={{ mt: 2 }}
          />

          <Box mt={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Choose Primary Color
            </Typography>
            <Grid container spacing={2}>
              {COLOR_OPTIONS.map((color) => (
                <Grid item key={color}>
                  <Button
                    variant={primaryColor === color ? "contained" : "outlined"}
                    onClick={() => changePrimaryColor(color)}
                    sx={{
                      bgcolor: color,
                      color: "#fff",
                      minWidth: 40,
                      minHeight: 40,
                      borderRadius: "50%",
                      borderColor: color,
                      "&:hover": {
                        bgcolor: color,
                        opacity: 0.8,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SettingsPage;
