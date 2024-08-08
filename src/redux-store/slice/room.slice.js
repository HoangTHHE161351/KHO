import { createSlice } from "@reduxjs/toolkit";
const { DataConstants } = require("src/const");

const initialState = {
  isFetching: false,
  error: null,
  searchKey: undefined,
  pagination: DataConstants.PAGINATION_DEFAULT,
  roomList: [],
  totalData: 0,
  roomDetail: undefined,
};

const reducers = {
  getRoomList: (state, action) => {
    state.isFetching = true;
  },
  getRoomListSuccess: (state, action) => {
    state.isFetching = false;
    state.roomList = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  getRoomDetail: (state, action) => {
    state.isFetching = true;
  },
  getRoomDetailSuccess: (state, action) => {
    state.isFetching = false;
    state.roomDetail = action.payload;
  },

  pageChange: (state, action) => {
    state.pagination = action.payload;
  },
  changeSearchKey: (state, action) => {
    state.searchKey = action.payload;
  },

  roomFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  roomReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.searchKey = undefined;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.roomList = [];
    state.totalData = 0;
    state.roomDetail = undefined;
  },
};

export const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers,
});

const roomReducer = roomSlice.reducer;
export default roomReducer;
