import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";
import Logo from "../../assets/Images/Logo.ico";

const Login = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Stack direction="row" alignItems="center" spacing={1} >
        <Box sx={{ width: 36, height: 36 }}>
          <img style={{maxHeight: "36px"}} src={Logo} alt="GigaChat" />
        </Box>
        <Typography variant="h4">Login to GigaChat</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New User?</Typography>
        <Link to="/auth/register" component={RouterLink} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
      <LoginForm />
      <AuthSocial />
    </Stack>
  );
};

export default Login;
