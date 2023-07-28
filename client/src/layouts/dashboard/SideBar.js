import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, useTheme } from '@mui/material'
import { Gear } from 'phosphor-react';

import AntSwitch from '../../components/AntSwitch';

import useSettings from "../../hooks/useSettings";

import { Nav_Buttons, Profile_Menu } from "../../data"
import { faker } from "@faker-js/faker";

const SideBar = () => {

    const theme = useTheme();

    const [selected, setSelected] = useState(0);
    const [anchorEl, setAnchorEl] = useState();

    const { onToggleMode } = useSettings()

    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    return (
        <Box sx={{
            backgroundColor: theme.palette.background,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
            height: "100dvh",
            width: 100
        }}>
            <Stack
                p={2}
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    height: "100%"
                }}
                spacing={3}
            >
                <Stack alignItems="center" spacing={4}>
                    <Stack
                        sx={{
                            width: "max-content"
                        }}
                        direction="column"
                        alignItems="center"
                        spacing={3}
                    >
                        {Nav_Buttons.map((el) =>
                            el.index === selected ?
                                <Box
                                    p={1}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5
                                    }}>
                                    <IconButton
                                        sx={{
                                            width: "max-content",
                                            color: "#fff"
                                        }}
                                        key={el.index}
                                    >
                                        {el.icon}
                                    </IconButton>
                                </Box>
                                :
                                <IconButton
                                    onClick={() => setSelected(el.index)}
                                    sx={{
                                        width: "max-content",
                                        color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary
                                    }}
                                    key={el.index}
                                >
                                    {el.icon}
                                </IconButton>
                        )}
                        <Divider sx={{ width: "48px" }} />
                        {selected === 3 ?
                            <Box
                                p={1}
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    borderRadius: 1.5
                                }}>
                                <IconButton
                                    sx={{
                                        width: "max-content",
                                        color: "#fff"
                                    }}
                                >
                                    <Gear />
                                </IconButton>
                            </Box>
                            :
                            <IconButton
                                onClick={() => setSelected(3)}
                                sx={{
                                    width: "max-content",
                                    color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary
                                }}
                            >
                                <Gear />
                            </IconButton>
                        }
                    </Stack>
                </Stack>
                <Stack spacing={4}>
                    <AntSwitch onClick={() => onToggleMode()} defaultChecked />
                    <Avatar
                        src={faker.image.avatar()}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button"
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                        }}
                    >
                        <Stack spacing={1} px={1}>
                            {Profile_Menu.map((item) => (
                                <MenuItem onClick={handleClick}>
                                    <Stack
                                        sx={{ width: 100 }}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <span>{item.title}</span>
                                        {item.icon}
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SideBar