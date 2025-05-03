import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

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

      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: { lg: "1fr 1fr" },
          backgroundColor: isDark ? "#1a001a" : "#fff",
          borderRadius: 3,
          boxShadow: isDark
            ? "0 0 30px rgba(255, 105, 180, 0.4)"
            : "0 0 30px rgba(255,182,193, 0.4)",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Left Side - Signup Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, sm: 6 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 400,
              p: 4,
              borderRadius: 3,
              backgroundColor: isDark ? "#2a0030" : "#fff0f5",
              boxShadow: isDark
                ? "0 0 25px rgba(255, 20, 147, 0.4)"
                : "0 0 25px rgba(255, 192, 203, 0.4)",
              color: isDark ? "#fff" : "#000",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: "#ff69b4",
                    width: 56,
                    height: 56,
                    "&:hover": { bgcolor: "#ff1493" },
                  }}
                >
                  <MessageIcon sx={{ color: "white" }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" mt={1}>
                  Join Us 💌
                </Typography>
                <Typography variant="body2" color={isDark ? "#f8bbd0" : "text.secondary"}>
                  Create your account
                </Typography>
              </Box>
            </Box>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {/* Full Name Field */}
              <TextField
                label="Full Name"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: isDark ? "#1f0020" : "white",
                  borderRadius: 2,
                  boxShadow: isDark
                    ? "0 0 10px rgba(255,105,180,0.3)"
                    : "0 0 10px rgba(255,182,193,0.4)",
                  input: { color: isDark ? "#fff" : "#000" },
                }}
              />

              <TextField
                label="Email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} color="gray" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: isDark ? "#1f0020" : "white",
                  borderRadius: 2,
                  boxShadow: isDark
                    ? "0 0 10px rgba(255,105,180,0.3)"
                    : "0 0 10px rgba(255,182,193,0.4)",
                  input: { color: isDark ? "#fff" : "#000" },
                }}
              />

              <TextField
                label="Password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} color="gray" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: isDark ? "#1f0020" : "white",
                  borderRadius: 2,
                  boxShadow: isDark
                    ? "0 0 10px rgba(255,105,180,0.3)"
                    : "0 0 10px rgba(255,182,193,0.4)",
                  input: { color: isDark ? "#fff" : "#000" },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSigningUp}
                startIcon={isSigningUp && <CircularProgress size={20} />}
                sx={{
                  background: "linear-gradient(to right, #ff69b4, #ff85c1)",
                  color: "#fff",
                  boxShadow: "0 0 12px #ff69b4",
                  "&:hover": {
                    background: "linear-gradient(to right, #ff1493, #ff6eb4)",
                    boxShadow: "0 0 16px #ff1493",
                  },
                }}
              >
                {isSigningUp ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color={isDark ? "#f8bbd0" : "text.secondary"}>
                Already have an account?{" "}
                <MuiLink component={Link} to="/login" underline="hover" color="primary" fontWeight="medium">
                  Sign in
                </MuiLink>
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Right Side - Logo Text */}
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            background: isDark
              ? "radial-gradient(circle, #1a001a, #0d001a)"
              : "linear-gradient(to bottom right, #ffe0f0, #fce4ec)",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: isDark ? "#ff69b4" : "#ff1493",
              fontFamily: "'Dancing Script', cursive",
              fontSize: "3rem",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            yappers
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
