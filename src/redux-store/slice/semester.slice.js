import { createSlice } from "@reduxjs/toolkit";

const { DataConstants } = require("src/const");

const initialState = {
  isFetching: false,
  error: null,

  pagination: DataConstants.PAGINATION_DEFAULT,
  semesterList: [],
  totalData: 0,
};

const reducers = {
  getSemesterListRequest: (state, action) => {
    state.isFetching = true;
    state.error = null;
  },
  getSemesterListSuccess: (state, action) => {
    state.isFetching = false;
    state.semesterList = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  changePage: (state, action) => {
    state.pagination = action.payload;
  },

  semesterFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  semesterReset: (state, action) => {
    state.isFetching = false;
    state.error = null;

    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.semesterList = [];
    state.totalData = 0;
  },
};

export const semesterSlice = createSlice({
  name: "semesterSlice",
  initialState,
  reducers,
});

const semesterReducer = semesterSlice.reducer;
export default semesterReducer;
