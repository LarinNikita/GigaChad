import React, { useState } from 'react'
import { Box, Divider, IconButton, Link, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';

import { Message_options } from "../../data"

const TimeLine = ({ el }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {el.text}
            </Typography>
            <Divider width="46%" />
        </Stack>
    )
};

const TextMsg = ({ el, menu }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="top"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                    {el.message}
                </Typography>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
};

const MediaMsg = ({ el, menu }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="top"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Stack spacing={1}>
                    <img
                        src={el.img}
                        alt={el.message}
                        style={{
                            maxHeight: 210,
                            borderRadius: "10px"
                        }}
                    />
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
};

const ReplytMsg = ({ el, menu }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="top"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.default
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1
                        }}
                    >
                        <Typography variant="body2" color={theme.palette.text}>
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
};

const LinkMsg = ({ el, menu }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="top"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        spacing={3}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 1
                        }}
                    >
                        <img
                            src={el.preview}
                            alt={el.message}
                            style={{
                                maxHeight: 210,
                                borderRadius: "10px"
                            }}
                        />
                        <Stack spacing={2}>
                            <Typography variant="subtitle2">Hello, world!</Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{ color: theme.palette.primary.main }}
                                component={Link}
                                to="//https://mui.com/material-ui"
                            >
                                https://mui.com/material-ui
                            </Typography>
                        </Stack>
                        <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
};

const DocMsg = ({ el, menu }) => {

    const theme = useTheme();

    return (
        <Stack
            direction="row"
            alignItems="top"
            justifyContent={el.incoming ? "start" : "end"}
        >
            <Box
                p={1.5}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5,
                    width: "max-content"
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={2}
                        spacing={3}
                        direction="row"
                        alignItems="center"
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 1
                        }}
                    >
                        <Image size={48} />
                        <Typography variant="caption">image.png</Typography>
                        <IconButton>
                            <DownloadSimple />
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" color={el.incoming ? theme.palette.text : "#fff"}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MsgOptions />}
        </Stack>
    )
};

const MsgOptions = () => {

    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    return (
        <>
            <DotsThreeVertical
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size={20}
                cursor="pointer"
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button"
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((item) => (
                        <MenuItem onClick={handleClick}>
                            {item.title}
                        </MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    )
};

export { TimeLine, TextMsg, MediaMsg, ReplytMsg, LinkMsg, DocMsg }