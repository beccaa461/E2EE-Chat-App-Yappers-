import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Avatar,
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { Camera, Mail, User } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
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

      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: isDark ? "#2a0030" : "#fff0f5",
            boxShadow: isDark
              ? "0 0 30px rgba(255, 105, 180, 0.4)"
              : "0 0 30px rgba(255, 182, 193, 0.4)",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h5" fontWeight="bold">
              Profile
            </Typography>
            <Typography
              variant="body2"
              color={isDark ? "#f8bbd0" : "text.secondary"}
              mt={1}
            >
              Your profile information
            </Typography>
          </Box>

          {/* Avatar Section */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            mb={4}
          >
            <Box position="relative">
              <Avatar
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                sx={{
                  width: 128,
                  height: 128,
                  border: "4px solid",
                  borderColor: "divider",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 12px rgba(255, 105, 180, 0.4)",
                  },
                }}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "text.primary",
                    color: "background.paper",
                    "&:hover": { transform: "scale(1.1)" },
                    transition: "transform 0.2s",
                    animation: isUpdatingProfile ? "pulse 1.5s infinite" : "none",
                  }}
                  disabled={isUpdatingProfile}
                >
                  <Camera size={20} />
                </IconButton>
                <input
                  type="file"
                  id="avatar-upload"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </Box>
            <Typography
              variant="caption"
              color={isDark ? "#f8bbd0" : "text.secondary"}
            >
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </Typography>
          </Box>

          {/* Profile Info */}
          <Stack spacing={3} mb={4}>
            <Box>
              <Typography
                variant="subtitle2"
                color={isDark ? "#000" : "text.secondary"}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <User size={16} />
                Full Name
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  px: 2,
                  py: 1.5,
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  color: isDark ? "#000" : "#000",
                }}
              >
                {authUser?.fullName}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color={isDark ? "#000" : "text.secondary"}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Mail size={16} />
                Email Address
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  px: 2,
                  py: 1.5,
                  bgcolor: "grey.100",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  color: isDark ? "#000" : "#000",
                }}
              >
                {authUser?.email}
              </Box>
            </Box>
          </Stack>

          {/* Account Info */}
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: isDark ? "#2a0030" : "#fff0f5",
              boxShadow: isDark
                ? "0 0 30px rgba(255, 105, 180, 0.4)"
                : "0 0 30px rgba(255, 182, 193, 0.4)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2} fontSize="0.875rem">
              <Box display="flex" justifyContent="space-between">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <span>Account Status</span>
                <Typography color="success.main">Active</Typography>
              </Box>
            </Stack>
          </Paper>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
