import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import {
  FetchFriendRequest,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import {
  FriendComponent,
  FriendRequestComponent,
  UserComponent,
} from "../../components/Friends";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  return (
    <>
      {users.map((el, index) => {
        return <UserComponent key={index} {...el} />;
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  return (
    <>
      {friends.map((el, index) => {
        return <FriendComponent key={index} {...el} />;
      })}
    </>
  );
};

const FriendRequestsList = () => {
  const dispatch = useDispatch();

  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendRequest());
  }, []);

  return (
    <>
      {friendRequests.map((el, index) => {
        return (
          <FriendRequestComponent key={index} {...el.sender} id={el._id} />
        );
      })}
    </>
  );
};

const Friends = ({ open, hadleClose }) => {
  const [value, setValue] = useState(0);

  const hadleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={hadleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={hadleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {(() => {
              switch (value) {
                case 0:
                  return <UsersList />;
                case 1:
                  return <FriendsList />;
                case 2:
                  return <FriendRequestsList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
