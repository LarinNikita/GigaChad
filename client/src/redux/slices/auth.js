import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (responce) {
        console.log(responce);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: responce.data.token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logOut());
  };
}

export function ForgotPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/forgot-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (responce) {
        console.log(responce);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export function NewPassword(formValues) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/reset-password",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (responce) {
        console.log(responce);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: responce.data.token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
