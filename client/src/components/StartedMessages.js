import React from 'react'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { CaretLeft } from 'phosphor-react';

import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../redux/slices/app';

import Messages from "../components/Conversation/Messages"

import { Scrollbars } from 'react-custom-scrollbars-2';

const StartedMessages = () => {

    const theme = useTheme();

    const dispatch = useDispatch();

    return (
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
                }}>
                    <Stack
                        sx={{ height: "100%", p: 2 }}
                        direction="row"
                        alignItems="center"
                        spacing={3}
                    >
                        <IconButton onClick={() => { dispatch(UpdateSidebarType("CONTACT")) }}>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant="subtitle2">Started Messages</Typography>
                    </Stack>
                </Box>

                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100} >
                    <Stack
                        sx={{
                            height: "100%",
                            position: "relative",
                            flexGrow: 1,
                        }}
                        p={3}
                        spacing={3}
                    >
                        <Messages />
                    </Stack>
                </Scrollbars>
            </Stack>
        </Box>
    )
}

export default StartedMessages