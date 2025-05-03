import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const AuthImagePattern = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // center vertically
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      {/* 3x3 Grid of Boxes */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          mb: 4,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main + '1A',
              animation: i % 2 === 0 ? 'pulse 1.5s infinite' : 'none',
            }}
          />
        ))}
      </Box>

      {/* Community Text */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Join our community
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Connect with friends, share moments, and stay in touch with your loved ones.
      </Typography>
    </Box>
  );
};

export default AuthImagePattern;
