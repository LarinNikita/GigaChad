import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StartedMessages from "../../components/StartedMessages";

import { useSelector } from "react-redux";

import NoChat from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const theme = useTheme();

  const { sidebar, chat_type, room_id } = useSelector((store) => store.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          width: sidebar.open ? "calc(100vw - 730px)" : "calc(100vw - 410px)",
          height: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f0f4fa"
              : theme.palette.background.default,
        }}
      >
        {room_id !== null && chat_type === "individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
            justifyContent="center"
          >
            <NoChat/>
            <Typography variant="subtitle2">Select a conversation or start new one</Typography>
          </Stack>
        )}
      </Box>
      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;

            case "STARTED":
              return <StartedMessages />;

            case "SHARED":
              return <SharedMessages />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
