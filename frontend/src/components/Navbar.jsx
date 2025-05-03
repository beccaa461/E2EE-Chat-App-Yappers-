import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const theme = useTheme();  // Get the current theme
  const isDark = theme.palette.mode === 'dark';  // Check if the theme is dark

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: isDark ? '#1a0030' : '#fdfcfb',  // Dark theme color vs light theme color
        borderBottom: '1px solid #f0e6f6',
        zIndex: 1200,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            minHeight: 64,
            px: 2,
          }}
        >
          {/* Left: Logo + Sparkle */}
          <Box display="flex" alignItems="center" gap={2}>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: isDark ? '#fff' : '#333',  // Change text color for dark theme
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: isDark
                    ? 'radial-gradient(circle, #3b0a45 30%, #2c0b2f 100%)'
                    : 'radial-gradient(circle, #fffbe6 30%, #fff0f5 100%)',
                  boxShadow: isDark ? '0 2px 6px rgba(0, 0, 0, 0.4)' : '0 2px 6px rgba(255, 223, 255, 0.4)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <MessageSquare size={20} color={isDark ? '#f59ec4' : '#f59ec4'} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#ffd700',
                    boxShadow: '0 0 8px #ffd700',
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                ml={1}
                sx={{
                  background: isDark
                    ? 'linear-gradient(90deg, #9a3f6b, #7c447a)'
                    : 'linear-gradient(90deg, #f6adc6, #fddde6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Yappers
              </Typography>
            </Link>
          </Box>

          {/* Right: Navigation Links */}
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              component={Link}
              to="/settings"
              variant="outlined"
              size="small"
              startIcon={<Settings size={16} />}
              sx={{
                color: isDark ? '#f3a9c1' : '#a854bc',  // Button color change
                borderColor: isDark ? '#c1b3d0' : '#e3c1ff',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: isDark ? '#4e0031' : '#f9efff',
                  borderColor: isDark ? '#7c4b7d' : '#d9a3ff',
                },
              }}
            >
              <Box display={{ xs: 'none', sm: 'block' }}>Settings</Box>
            </Button>

            {authUser && (
              <>
                <Button
                  component={Link}
                  to="/profile"
                  variant="outlined"
                  size="small"
                  startIcon={<User size={16} />}
                  sx={{
                    color: isDark ? '#b5d7ff' : '#4e88ff',  // Button color change
                    borderColor: isDark ? '#3e6db7' : '#cce0ff',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: isDark ? '#2d3b5f' : '#f0f7ff',
                      borderColor: isDark ? '#789bb9' : '#aacfff',
                    },
                  }}
                >
                  <Box display={{ xs: 'none', sm: 'block' }}>Profile</Box>
                </Button>

                <Button
                  onClick={logout}
                  color="error"
                  size="small"
                  startIcon={<LogOut size={16} />}
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: '#fff1f1',
                    },
                  }}
                >
                  <Box display={{ xs: 'none', sm: 'block' }}>Logout</Box>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
