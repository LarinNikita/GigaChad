import React from 'react';
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from "phosphor-react";

import { useDispatch } from "react-redux";
import { ToggleSidebar } from '../redux/slices/app';

import { Scrollbars } from 'react-custom-scrollbars-2';

import AntSwitch from '../components/AntSwitch';

import { faker } from '@faker-js/faker';

// TODO: Посмотреть возможность реализовать данный компонент с помощью Drawer

const Contact = () => {

  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Box sx={{
      width: 320,
      height: "100vh"
    }}>
      <Stack sx={{ height: "100%" }}>
        <Box sx={{
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#f8faff" : theme.palette.background.paper
        }}>
          <Stack
            sx={{
              height: "100%",
              p: 2
            }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => { dispatch(ToggleSidebar()) }}>
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={100} >
          <Stack
            sx={{
              height: "100%",
              position: "relative",
              flexGrow: 1,
            }}
            p={3}
            spacing={3}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.firstName}
                sx={{
                  width: 64,
                  height: 64
                }}
              />
              <Stack spacing={0.5}>
                <Typography variant="article" fontWeight={600}>
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {faker.phone.number('+##-##-###-##-##')}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Stack
                spacing={1}
                alignItems="center"
              >
                <IconButton>
                  <Phone />
                </IconButton>
                <Typography variant="overline">
                  Voice
                </Typography>
              </Stack>
              <Stack
                spacing={1}
                alignItems="center"
              >
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">
                  Video
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack spacing={0.5}>
              <Typography variant="article">About</Typography>
              <Typography variant="body2">Why i am here?</Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent='space-between'
            >
              <Typography variant="subtitle2">Media, Links & Docs</Typography>
              <Button endIcon={<CaretRight />}>401</Button>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              {[1, 2, 3].map((el) => (
                <Box>
                  <img src={faker.image.food()} alt={faker.name.firstName()} />
                </Box>
              ))}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Star size={21} />
                <Typography variant="subtitle2">Started Messages</Typography>
              </Stack>
              <IconButton>
                <CaretRight />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Bell size={21} />
                <Typography variant="subtitle2">Mute Notifications</Typography>
              </Stack>
              <AntSwitch />
            </Stack>
            <Divider />
            <Typography>1 group in common</Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} />
              <Stack spacing={0.5}>
                <Typography variant="subtitle2">Coding Monk</Typography>
                <Typography variant="caption">Owl, Parrot, Rabbit, You</Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Button startIcon={<Prohibit />} fullWidth variant="outlined">
                Block
              </Button>
              <Button startIcon={<Trash />} fullWidth variant="outlined">
                Delete
              </Button>
            </Stack>
          </Stack>
        </Scrollbars>
      </Stack>
    </Box>
  )
}

export default Contact