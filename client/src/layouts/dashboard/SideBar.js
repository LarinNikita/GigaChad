import React, { useState } from 'react'
import { Avatar, Box, Divider, IconButton, Stack, useTheme } from '@mui/material'
import { Gear } from 'phosphor-react';

import AntSwitch from '../../components/AntSwitch';

import useSettings from "../../hooks/useSettings";

import { Nav_Buttons } from "../../data"
import { faker } from "@faker-js/faker";

const SideBar = () => {

    const theme = useTheme();

    const [selected, setSelected] = useState(0);

    const { onToggleMode } = useSettings()

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
                    <Avatar src={faker.image.avatar()} />
                </Stack>
            </Stack>
        </Box>
    )
}

export default SideBar