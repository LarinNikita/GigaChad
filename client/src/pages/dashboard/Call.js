import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { MagnifyingGlass, Phone } from "phosphor-react";

import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { CallLogElement } from "../../components/CallElement";

import { Scrollbars } from "react-custom-scrollbars-2";
import { CallLogs } from "../../data";
import StartCall from "../../sections/main/StartCall";

const Call = () => {
  const theme = useTheme();

  const [openCall, setOpenCall] = useState(false);

  const handleCloseCall = () => {
    setOpenCall(false);
  };

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Box
        sx={{
          width: 320,
          height: "100vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#f8faff"
              : theme.palette.background.paper,
          boxShadow: "0 0 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={2} spacing={2} sx={{ height: "100vh" }}>
          <Stack>
            <Typography variant="h5">Call Logs</Typography>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709ce6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..." />
            </Search>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2" component={Link}>
              Start new converstation
            </Typography>
            <IconButton
              onClick={() => {
                setOpenCall(true);
              }}
            >
              <Phone style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
          <Divider />
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100}>
            <Stack spacing={2} direction="column" sx={{ flexGrow: 1 }}>
              <Stack spacing={2.4}>
                {CallLogs.map((el) => {
                  return <CallLogElement {...el} />;
                })}
              </Stack>
            </Stack>
          </Scrollbars>
        </Stack>
      </Box>
      {openCall && <StartCall open={openCall} handleClose={handleCloseCall} />}
    </Stack>
  );
};

export default Call;
