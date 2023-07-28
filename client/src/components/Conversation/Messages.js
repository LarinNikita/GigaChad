import React from 'react';
import { Box, Stack } from "@mui/material";

import { DocMsg, LinkMsg, MediaMsg, ReplytMsg, TextMsg, TimeLine } from './MsgTypes';

import { Chat_History } from "../../data";

const Messages = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            return <TimeLine el={el} />;
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    return <MediaMsg el={el} />;
                                case "doc":
                                    return <DocMsg el={el} />;

                                case "link":
                                    return <LinkMsg el={el} />

                                case "reply":
                                    return <ReplytMsg el={el} />

                                default:
                                    return <TextMsg el={el} />;
                            }
                            break;

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Messages