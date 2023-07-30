import React from 'react';
import { Divider, IconButton, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const AuthSocial = () => {
    return (
        <>
            <Divider sx={{
                my: 2.5,
                typography: "overline",
                color: "text.disabled",
                '&::before, ::after': {
                    borderTopStyle: "dashed"
                }
            }}>
                OR
            </Divider>
            <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
            >
                <IconButton>
                    <GoogleIcon />
                </IconButton>
                <IconButton>
                    <GitHubIcon />
                </IconButton>
                <IconButton>
                    <TwitterIcon />
                </IconButton>
            </Stack>
        </>
    )
}

export default AuthSocial