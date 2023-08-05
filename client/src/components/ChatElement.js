import {
  Avatar,
  Badge,
  Box,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../redux/slices/app";

const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { room_id } = useSelector((state) => state.app);
  const selectedChatId = room_id?.toString();

  let isSelected = +(selectedChatId === id);

  if (!selectedChatId) {
    isSelected = false;
  }

  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? theme.palette.primary.main
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
        color: isSelected && "#fff",
        cursor: "pointer",
      }}
      p={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot">
              <Avatar src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar src={faker.image.avatar()} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
