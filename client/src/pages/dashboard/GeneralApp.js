import React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";

const GeneralApp = () => {

  const theme = useTheme();

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box sx={{
        width: "calc(100vw - 410px)",
        height: "100%",
        backgroundColor: theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background.default
      }}>
        <Conversation />
      </Box>
    </Stack>
  );
};

export default GeneralApp;
