import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Box, Avatar, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessgageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { deleteMessage } from "../lib/axios";
import { useTheme } from "@mui/material/styles";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    removeMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      removeMessage(id); // Zustand update
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
        background: isDark
          ? "radial-gradient(circle at top left, #1a001a, #0d001a)"
          : "linear-gradient(to right, #ffe0f0, #fce4ec)",
        position: "relative",
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
      <ChatHeader />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 1,
        }}
      >
        {isMessagesLoading ? (
          <MessageSkeleton />
        ) : Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message) => {
            const isOwnMessage = message.senderId === authUser._id;
            return (
              <Box
                key={message._id}
                sx={{
                  alignSelf: isOwnMessage ? "flex-end" : "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "70%",
                  "&:hover .delete-icon": {
                    display: isOwnMessage ? "flex" : "none",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={isOwnMessage ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    sx={{
                      width: 40,
                      height: 40,
                      border: "1px solid #ccc",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {formatMessageTime(message.createdAt)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: isOwnMessage ? "primary.main" : "grey.300",
                    color: isOwnMessage ? "primary.contrastText" : "text.primary",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    boxShadow: isDark
                      ? "0 0 30px rgba(255, 105, 180, 0.4)"
                      : "0 0 30px rgba(255, 182, 193, 0.4)",
                  }}
                >
                  {message.image && (
                    <Box
                      component="img"
                      src={message.image}
                      alt="Attachment"
                      sx={{ maxWidth: 200, borderRadius: 1, mb: message.text ? 1 : 0 }}
                    />
                  )}
                  {message.text && <Typography variant="body2">{message.text}</Typography>}

                  {isOwnMessage && (
                    <Box
                      className="delete-icon"
                      onClick={() => handleDelete(message._id)}
                      sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        cursor: "pointer",
                        display: "none",
                        fontSize: "14px",
                        color: "error.main",
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mt: 4,
              opacity: 0.7,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: isDark ? "rgba(255, 105, 180, 0.3)" : "rgba(255, 182, 193, 0.3)",
                backgroundImage: isDark
                  ? "radial-gradient(circle, #ff69b4 1px, transparent 1px)"
                  : "radial-gradient(circle, #ffc0cb 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                animation: "pulse 1.5s infinite",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: isDark ? "text.secondary" : "text.primary",
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              No messages yet...
            </Typography>
            <Typography
              variant="body2"
              color="primary.main"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                ":hover": {
                  color: "#ff1493",
                },
              }}
            >
              Start chatting now!
            </Typography>
          </Box>
        )}
        <div ref={messageEndRef} />
      </Box>

      <MessageInput />
    </Box>
  );
};

export default ChatContainer;
