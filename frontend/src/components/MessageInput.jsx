import React, { useRef, useState } from "react";
import { Box, IconButton, InputBase, Paper, Avatar, useTheme } from "@mui/material";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box
      sx={{
        px: 2,
        py: 3,
        width: "100%",
        background: isDark
          ? "radial-gradient(circle at bottom right, #1a001a, #0d001a)"
          : "linear-gradient(to right, #ffe0f0, #fce4ec)",
        borderRadius: 4,
        position: "relative",
        boxShadow: isDark
          ? "0 0 20px rgba(255, 105, 180, 0.3)"
          : "0 0 20px rgba(255, 182, 193, 0.4)",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* Glitter overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          pointerEvents: "none",
          backgroundImage: isDark
            ? `radial-gradient(circle, #ff69b4 1px, transparent 1px), radial-gradient(circle, #ff1493 1px, transparent 1px)`
            : `radial-gradient(circle, #fff 1px, transparent 1px), radial-gradient(circle, #ffc0cb 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
          opacity: isDark ? 0.07 : 0.2,
          zIndex: 0,
        }}
      />

      {imagePreview && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1.5, zIndex: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              variant="rounded"
              src={imagePreview}
              alt="Preview"
              sx={{
                width: 80,
                height: 80,
                border: "2px solid",
                borderColor: "pink.main",
                boxShadow: "0 0 12px rgba(255, 105, 180, 0.4)",
              }}
            />
            <IconButton
              onClick={removeImage}
              size="small"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: "background.paper",
                width: 24,
                height: 24,
                boxShadow: 2,
                "&:hover": {
                  bgcolor: "error.main",
                  color: "#fff",
                  transform: "scale(1.1)",
                },
              }}
            >
              <X size={12} />
            </IconButton>
          </Box>
        </Box>
      )}

      <form onSubmit={handleSendMessage} style={{ display: "flex", gap: 8, zIndex: 1 }}>
        <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
          <Paper
            component="div"
            sx={{
              p: "6px 12px",
              display: "flex",
              alignItems: "center",
              flex: 1,
              borderRadius: 4,
              backgroundColor: isDark ? "#1e0025" : "#fff0f5",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: isDark
                ? "inset 0 0 10px rgba(255, 105, 180, 0.2)"
                : "inset 0 0 10px rgba(255, 182, 193, 0.2)",
            }}
            elevation={0}
          >
            <InputBase
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              sx={{
                fontSize: { xs: 14, sm: 16 },
                color: isDark ? "#fff" : "#000",
              }}
            />
          </Paper>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />

          <IconButton
            onClick={() => fileInputRef.current?.click()}
            sx={{
              color: imagePreview ? "success.main" : "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <Image size={20} />
          </IconButton>
        </Box>

        <IconButton
          type="submit"
          disabled={!text.trim() && !imagePreview}
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": {
              bgcolor: "primary.dark",
              transform: "scale(1.1)",
              boxShadow: "0 0 10px rgba(255, 105, 180, 0.5)",
            },
            transition: "all 0.2s",
            width: 40,
            height: 40,
          }}
        >
          <Send size={20} />
        </IconButton>
      </form>
    </Box>
  );
};

export default MessageInput;
