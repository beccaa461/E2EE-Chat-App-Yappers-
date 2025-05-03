import { IconButton, Box, Avatar, Typography, Divider, useTheme } from "@mui/material";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const theme = useTheme();
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* User Info Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            sx={{ width: 40, height: 40 }}
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={500}>
            {selectedUser.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>

      {/* Close Button */}
      <IconButton onClick={() => setSelectedUser(null)}>
        <X size={20} />
      </IconButton>
    </Box>
  );
};

export default ChatHeader;
