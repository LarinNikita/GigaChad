import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from "../../sections/auth/AuthSocial";
import Logo from "../../assets/Images/Logo.ico";

const Register = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box sx={{ width: 36, height: 36 }}>
          <img style={{ maxHeight: "36px" }} src={Logo} alt="GigaChat" />
        </Box>
        <Typography variant="h4">Get Started With GigaChat</Typography>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Already have an account?</Typography>
        <Link to="/auth/login" component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>

      <RegisterForm />

      <Typography
        component="div"
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By signining up, I agree to "}
        <Link
          href="https://www.youtube.com/watch?v=NY0ffyEu6uo"
          underline="always"
          color="text.primary"
        >
          Terms of service
        </Link>
        {" and "}
        <Link
          href="https://www.youtube.com/watch?v=NY0ffyEu6uo"
          underline="always"
          color="text.primary"
        >
          Privacy Policy
        </Link>
      </Typography>

      <AuthSocial />
    </Stack>
  );
};

export default Register;
