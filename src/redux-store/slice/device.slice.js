import { createSlice } from "@reduxjs/toolkit";

const { DataConstants } = require("src/const");

const initialState = {
  isFetching: false,
  error: null,

  totalData: 0,
  devices: [],
  pagination: DataConstants.PAGINATION_DEFAULT,
};

const reducers = {
  getDeviceList: (state, action) => {
    state.isFetching = true;
  },
  getDeviceListSuccess: (state, action) => {
    state.isFetching = false;
    state.devices = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  changePagination: (state, action) => {
    state.pagination = action.payload;
  },

  startLoading: (state) => {
    state.isFetching = true;
  },
  stopLoading: (state) => {
    state.isFetching = false;
  },

  changePage: (state, action) => {
    state.pagination = action.payload;
  },

  deviceFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  deviceReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.totalData = 0;
    state.devices = [];
    state.pagination = DataConstants.PAGINATION_DEFAULT;
  },
};

export const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers,
});

const deviceReducer = deviceSlice.reducer;
export default deviceReducer;
