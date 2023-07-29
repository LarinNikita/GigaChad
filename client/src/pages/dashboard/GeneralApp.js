import React from "react";
import { Box, Stack, useTheme } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";

import { useSelector } from "react-redux";

const GeneralApp = () => {

  const theme = useTheme();

  const { sidebar } = useSelector((store) => store.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box sx={{
        width: sidebar.open ? "calc(100vw - 730px)" : "calc(100vw - 410px)",
        height: "100%",
        backgroundColor: theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background.default
      }}>
        <Conversation />
      </Box>
      {sidebar.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
