import React from "react";
import { Box, Typography, Paper, useTheme, Container } from "@mui/material";
import { MessageCircle } from "lucide-react";

const NoChatSelected = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
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
      {/* Glitter Effect */}
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
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: isDark ? "#2a0030" : "#fff0f5",
            boxShadow: isDark
              ? "0 0 30px rgba(255, 105, 180, 0.4)"
              : "0 0 30px rgba(255, 182, 193, 0.4)",
          }}
        >
          <MessageCircle size={48} color={isDark ? "#ff69b4" : "#e91e63"} />
          <Typography variant="h5" mt={2} fontWeight="bold">
            Welcome to YAPPERS!          </Typography>
          <Typography
            variant="body2"
            mt={1}
            color={isDark ? "#f8bbd0" : "text.secondary"}
          >
            Select a conversation to start messaging
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default NoChatSelected;
