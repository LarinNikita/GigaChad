import React from "react";
import { Box, Container, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor:
          theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background,
      }}
    >
      <Container
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.paper,
          borderRadius: "10px",
        }}
        maxWidth="sm"
      >
        <Box sx={{ pt: 5, px: 2 }}>
          {" "}
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
