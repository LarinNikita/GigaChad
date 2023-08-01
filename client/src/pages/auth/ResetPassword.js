import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";
import Logo from "../../assets/Images/Logo.ico";

const ResetPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: 36, height: 36 }}>
          <img style={{ maxHeight: "36px" }} src={Logo} alt="GigaChat" />
        </Box>
        <Typography variant="h3" paragraph>
          Forgot your Password?
        </Typography>
      </Stack>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Please enter the email address associated with уоur account and Wе will
        email уоu a link to reset уоur password.
      </Typography>

      <ResetPasswordForm />

      <Link
        component={RouterLink}
        to="/auth/login"
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <CaretLeft />
        Return to sign in
      </Link>
    </Stack>
  );
};

export default ResetPassword;
