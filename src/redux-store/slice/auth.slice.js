import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { ApiConstants } from "src/const";

const initialState = {
  isFetching: false,
  error: false,

  userInfo: {},
};

const reducer = {
  requestLogin(state, action) {
    state.isFetching = true;
  },
  requestLoginSuccess(state, action) {
    state.isFetching = false;
    Cookies.set(ApiConstants.ACCESS_TOKEN, action?.payload?.user?.accessToken);
    state.userInfo = action.payload.user;
  },

  getUserProfile(state) {
    state.isFetching = true;
  },
  getUserProfileSuccess(state, action) {
    state.isFetching = false;
    state.userInfo = action.payload;
  },

  requestRegister(state, action) {
    state.isFetching = true;
  },
  requestRegisterSuccess(state, action) {
    state.isFetching = false;
  },

  authFailure(state, action) {
    state.isFetching = false;
    state.error = action.payload;
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: reducer,
});

const authReducer = authSlice.reducer;
export default authReducer;
