import { Box, Avatar, Skeleton, Stack } from "@mui/material";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {skeletonMessages.map((_, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: isLeft ? "flex-start" : "flex-end",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {isLeft && (
                <Skeleton variant="circular">
                  <Avatar sx={{ width: 40, height: 40 }} />
                </Skeleton>
              )}
              <Box>
                <Skeleton variant="text" width={64} height={20} />
                <Skeleton variant="rounded" width={200} height={64} sx={{ mt: 1 }} />
              </Box>
              {!isLeft && (
                <Skeleton variant="circular">
                  <Avatar sx={{ width: 40, height: 40 }} />
                </Skeleton>
              )}
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageSkeleton;
