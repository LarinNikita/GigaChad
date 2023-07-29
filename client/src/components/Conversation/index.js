import React from 'react'
import { Box, Stack } from '@mui/material'

import { Scrollbars } from 'react-custom-scrollbars-2';

import Header from './Header';
import Messages from './Messages';
import Footer from './Footer';

const Conversation = () => {
    return (
        <Stack height="100%" maxHeight="100vh" width="auto">
            <Header />
            <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
                <Box width="100%" sx={{ flexGrow: 1, height: "100%" }}>
                    <Messages menu={true}/>
                </Box>
            </Scrollbars>
            <Footer />
        </Stack>
    )
}

export default Conversation