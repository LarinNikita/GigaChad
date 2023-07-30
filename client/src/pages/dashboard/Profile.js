import React from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/settings/ProfileForm";

const Profile = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box
        sx={{
          overflowY: "auto",
          width: 320,
          height: "100vh",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f8faff"
              : theme.palette.background.paper,
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={4} spacing={5}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton>
              <CaretLeft
                size={24}
                color={
                  theme.palette.mode === "light"
                    ? "#4b4b4b"
                    : theme.palette.text.primary
                }
              />
            </IconButton>
            <Typography variant="h5" fontWeight={900}>
              Profile
            </Typography>
          </Stack>
          <ProfileForm />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Profile;
