import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from "phosphor-react";

import { faker } from "@faker-js/faker";
import Shortcuts from '../../sections/settings/Shortcuts';

const Settings = () => {

    const theme = useTheme();

    const [openShortCuts, setOpenShortCuts] = useState();

    const handleOpenShortCuts = () => {
        setOpenShortCuts(true);
    };
    const handleCloseShortCuts = () => {
        setOpenShortCuts(false);
    };

    const list = [
        {
            Кеу: 0,
            icon: <Bell size={20} />,
            title: "Notification",
            onClick: () => { },
        },
        {
            Кеу: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onClick: () => { },
        },
        {
            Кеу: 2,
            icon: <Key size={20} />,
            title: "Security",
            onClick: () => { },
        },
        {
            Кеу: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            onClick: () => { },
        },
        {
            Кеу: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onClick: () => { },
        },
        {
            Кеу: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onClick: () => { },
        },
        {
            Кеу: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onClick: handleOpenShortCuts,
        },
        {
            Кеу: 7,
            icon: <Info size={20} />,
            title: "Help",
            onClick: () => { },
        },
    ];

    return (
        <>
            <Stack direction="row" sx={{ width: "100%" }}>
                <Box sx={{
                    overflowY: "auto",
                    width: 320,
                    height: "100vh",
                    backgroundColor:
                        theme.palette.mode === "light"
                            ? "#f8faff"
                            : theme.palette.background.paper,
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
                }}>
                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={3}
                        >
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
                            <Typography variant="h5" fontWeight={900}>Settings</Typography>
                        </Stack>
                        {/* Profile */}
                        <Stack
                            direction="row"
                            spacing={3}
                            alignItems="center"
                        >
                            <Avatar
                                sx={{ width: 56, height: 56 }}
                                src={faker.image.avatar()}
                                alt={faker.name.firstName()}
                            />
                            <Stack spacing={0.5}>
                                <Typography variant="article">
                                    {faker.name.fullName()}
                                </Typography>
                                <Typography variant="body2">
                                    {faker.random.word()}
                                </Typography>
                            </Stack>
                        </Stack>
                        {/* List of options */}
                        <Stack spacing={4}>
                            {list.map((item, index) => (
                                <Stack
                                    key={item.key}
                                    onClick={item.onClick}
                                    spacing={2}
                                    sx={{ cursor: "pointer" }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        {item.icon}
                                        <Typography variant="body2">
                                            {item.title}
                                        </Typography>
                                    </Stack>
                                    {index !== list.length - 1 && <Divider />}
                                </Stack>

                            ))}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            {openShortCuts && <Shortcuts open={openShortCuts} handleClose={handleCloseShortCuts} />}
        </>
    )
}

export default Settings