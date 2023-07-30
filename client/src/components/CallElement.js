import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Phone,
  VideoCamera,
} from "phosphor-react";

const CallLogElement = ({
  id,
  name,
  img,
  msg,
  time,
  unread,
  online,
  iscoming,
  missed,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {iscoming ? (
                <ArrowDownLeft color={missed ? "#D45E6C" : "#76D45E"} />
              ) : (
                <ArrowUpRight color={missed ? "#D45E6C" : "#76D45E"} />
              )}
              <Typography variant="caption">Yersterday 21:24</Typography>
            </Stack>
          </Stack>
        </Stack>
        <IconButton>
          <Phone color="#76D45E" />
        </IconButton>
      </Stack>
    </Box>
  );
};

const CallElement = ({
  id,
  name,
  img,
  msg,
  time,
  unread,
  online,
  iscoming,
  missed,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      p={2}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Typography variant="caption">Yersterday 21:24</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Phone color="#76D45E" />
          </IconButton>
          <IconButton>
            <VideoCamera color="#76D45E" />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export { CallLogElement, CallElement };
