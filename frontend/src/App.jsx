import React, { useEffect } from 'react';
import './index.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from "react-hot-toast";
import { useThemeContext } from "./Theme.jsx";
import {
  Box,
  IconButton
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  const { mode, toggleColorMode } = useThemeContext();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  console.log({ onlineUsers });

  if (isCheckingAuth && !authUser) {
    console.log("isCheckingAuth:", isCheckingAuth);
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Theme Toggle Button */}
      <Box sx={{ position: "absolute", top: 10, right: 20 }}>
        <IconButton onClick={toggleColorMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>

      {/* Page Routes */}
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </Box>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
