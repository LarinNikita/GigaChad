import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import { Gear } from "phosphor-react";

import AntSwitch from "../../components/AntSwitch";

import useSettings from "../../hooks/useSettings";

import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";

import Logo from "../../assets/Images/Logo.ico";
import { LogoutUser } from "../../redux/slices/auth";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      return "/auth/login";

    default:
      break;
  }
};

const SideBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);
  const [anchorEl, setAnchorEl] = useState();

  const { onToggleMode } = useSettings();

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background,
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
        height: "100dvh",
        width: 100,
      }}
    >
      <Stack
        p={2}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: "100%",
        }}
        spacing={3}
      >
        <Stack alignItems="center" spacing={4}>
          <Box
            sx={{
              height: 52,
              width: 52,
              borderRadius: 1.5,
            }}
            p={1}
          >
            <img src={Logo} alt="GigaChat" />
          </Box>
          <Stack
            sx={{
              width: "max-content",
            }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{
                      width: "max-content",
                      color: "#fff",
                    }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <Box p={1}>
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                      navigate(getPath(el.index));
                    }}
                    sx={{
                      width: "max-content",
                      color:
                        theme.palette.mode === "light"
                          ? "#000"
                          : theme.palette.text.primary,
                    }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              )
            )}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ? (
              <Box
                p={1}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  sx={{
                    width: "max-content",
                    color: "#fff",
                  }}
                >
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <Box p={1}>
                <IconButton
                  onClick={() => {
                    setSelected(3);
                    navigate(getPath(3));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                >
                  <Gear />
                </IconButton>
              </Box>
            )}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch onClick={() => onToggleMode()} defaultChecked />
          <Avatar
            src={faker.image.avatar()}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((item, index) => (
                <MenuItem
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <Stack
                    onClick={() => {
                      if (index === 2) {
                        dispatch(LogoutUser());
                      } else {
                        navigate(getMenuPath(index));
                      }
                    }}
                    sx={{ width: 100 }}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{item.title}</span>
                    {item.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
