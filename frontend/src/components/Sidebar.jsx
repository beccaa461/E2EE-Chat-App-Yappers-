import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  Box,
  Typography,
  Checkbox,
  Avatar,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: 80, lg: 288 },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: isDark
          ? "radial-gradient(circle at top left, #1a001a, #0d001a)"
          : "linear-gradient(to bottom, #ffe0f0, #fce4ec)",
        color: isDark ? "#fff" : "#000",
        borderRight: "1px solid",
        borderColor: "divider",
        zIndex: 1,
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
          opacity: isDark ? 0.08 : 0.2,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          width: "100%",
          p: 2,
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Users size={24} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 500, display: { xs: "none", lg: "block" } }}
          >
            Contacts
          </Typography>
        </Box>

        {/* Online Filter Toggle */}
        <Box
          sx={{
            mt: 2,
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Checkbox
            size="small"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            sx={{
              color: isDark ? "#f8bbd0" : "#e91e63",
            }}
          />
          <Typography variant="body2">Show online only</Typography>
          <Typography variant="caption" color="text.secondary">
            ({(onlineUsers?.length || 1) - 1} online)
          </Typography>
        </Box>
      </Box>

      {/* User List */}
      <Box sx={{ overflowY: "auto", width: "100%", py: 1, zIndex: 1 }}>
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <Button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                textTransform: "none",
                borderRadius: 0,
                backgroundColor: isSelected
                  ? isDark
                    ? "#4a004f"
                    : "#f8bbd0"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255, 105, 180, 0.08)"
                    : "rgba(233, 30, 99, 0.1)",
                },
              }}
            >
              <Box sx={{ position: "relative", mx: { xs: "auto", lg: 0 } }}>
                <Avatar
                  src={user.profilePic || "/default-avatar.png"}
                  alt={user.name}
                  sx={{
                    width: 48,
                    height: 48,
                    border: isSelected ? "2px solid #ff69b4" : "none",
                    boxShadow: isSelected
                      ? "0 0 8px rgba(255, 105, 180, 0.5)"
                      : "none",
                  }}
                />
                {isOnline && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 10,
                      height: 10,
                      bgcolor: "green",
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: theme.palette.background.paper,
                    }}
                  />
                )}
              </Box>

              {/* User Info */}
              <Box
                sx={{
                  display: { xs: "none", lg: "block" },
                  textAlign: "left",
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="body1"
                  noWrap
                  sx={{ fontWeight: 500, color: isSelected ? "#ff69b4" : "inherit" }}
                >
                  {user.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {isOnline ? "Online" : "Offline"}
                </Typography>
              </Box>
            </Button>
          );
        })}

        {filteredUsers.length === 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 2 }}
          >
            No online users
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
