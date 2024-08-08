import { createSlice } from "@reduxjs/toolkit";
import { DataConstants } from "src/const";

const DEFAULT_FILTER = {
  status: null,
  roleName: null,
  gender: null,
  search: null,
};

const initialState = {
  isFetching: false,
  error: null,

  totalData: 0,
  pagination: DataConstants.PAGINATION_DEFAULT,
  userList: [],
  filter: DEFAULT_FILTER,
  userProfile: {},
};

const reducers = {
  getUserByToken: (state, action) => {
    state.isFetching = true;
  },
  getUserByTokenSuccess: (state, action) => {
    state.isFetching = false;
    state.userProfile = action.payload;
  },

  getUserBlackList: (state, action) => {
    state.isFetching = true;
    state.error = null;
  },
  getUserBlackListSuccess: (state, action) => {
    state.isFetching = false;
    state.userList = action.payload.useBlackList;
    state.totalData = action.payload.totalElements;
  },

  changeFilterWithKey: (state, action) => {
    const objectData = action.payload;
    state.filter[objectData.key] = objectData.value;
    state.pagination.page = DataConstants.PAGINATION_DEFAULT.page;
  },

  startLoading: (state) => {
    state.isFetching = true;
  },
  stopLoading: (state) => {
    state.isFetching = false;
  },

  getUserList: (state, action) => {
    state.isFetching = true;
  },
  getUserListSuccess: (state, action) => {
    state.isFetching = false;
    state.userList = action.payload.userList;
    state.totalData = action.payload.totalElements;
  },

  changePage: (state, action) => {
    state.pagination = action.payload;
  },

  userFailed: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  userReset: (state) => {
    state.isFetching = false;
    state.error = null;
    state.userProfile = {};
    state.filter = DEFAULT_FILTER;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers,
});

const userReducer = userSlice.reducer;
export default userReducer;
