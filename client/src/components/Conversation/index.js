import React from 'react'
import { Avatar, Badge, Box, Divider, IconButton, InputAdornment, Stack, TextField, Typography, styled, useTheme } from '@mui/material'
import { faker } from "@faker-js/faker";
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneRight, Phone, Smiley, VideoCamera } from 'phosphor-react';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));

const Conversation = () => {

    const theme = useTheme();

    return (
        <Stack height="100%" maxHeight="100vh" width="auto">
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
                }}
            >
                <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ width: "100%", height: "100%" }}>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                            </StyledBadge>
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
                            <Typography variant="caption">Online</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={3}>
                        <IconButton>
                            <VideoCamera />
                        </IconButton>
                        <IconButton>
                            <Phone />
                        </IconButton>
                        <IconButton>
                            <MagnifyingGlass />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton>
                            <CaretDown />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
            <Box width="100%" sx={{ flexGrow: 1 }}>

            </Box>
            <Box
                p={2}
                sx={{
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper,
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
                }}
            >
                <Stack direction="row" alignItems="center" spacing={3}>
                    <StyledInput
                        fullWidth
                        placeholder="Write a message..."
                        variant="filled"
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <LinkSimple />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <Smiley />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5
                    }}>
                        <Stack sx={{ width: "100%", height: "100%" }} alignItems="center" justifyContent="center">
                            <IconButton>
                                <PaperPlaneRight color="#fff" />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Conversation