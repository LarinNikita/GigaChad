import React from 'react'
import { Box, IconButton, InputAdornment, Stack, TextField, styled, useTheme } from '@mui/material'
import { LinkSimple, PaperPlaneRight, Smiley } from 'phosphor-react';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}));

const Footer = () => {

    const theme = useTheme();

    return (
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
                    <Stack
                        sx={{
                            width: "100%",
                            height: "100%"
                        }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <IconButton>
                            <PaperPlaneRight color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer