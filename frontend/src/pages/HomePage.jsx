import React from 'react'
import { Box, Container, Paper } from "@mui/material";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
const { selectedUser } = useChatStore();
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 10,
        px: 2,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            height: "calc(100vh - 8rem)",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Main chat area */}
          <Box sx={{ flex: 1 }}>
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage
