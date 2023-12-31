import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Box, Container, useTheme } from "@mui/material";

const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const theme = useTheme();

  if (isLoggedIn) {
    return <Navigate to="/app" />;
  }

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
