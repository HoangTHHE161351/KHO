import { createSlice } from "@reduxjs/toolkit";

const { DataConstants } = require("src/const");

const initialState = {
  isFetching: false,
  error: null,

  searchKey: undefined,
  pagination: DataConstants.PAGINATION_DEFAULT,
  curriculumList: [],
  totalData: 0,
  curriculumDetail: undefined,
};

const reducers = {
  getCurriculumList: (state, action) => {
    state.isFetching = true;
  },
  getCurriculumListSuccess: (state, action) => {
    state.isFetching = false;
    state.curriculumList = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  getCurriculumDetail: (state, action) => {
    state.isFetching = true;
  },
  getCurriculumDetailSuccess: (state, action) => {
    state.isFetching = false;
    state.curriculumDetail = action.payload;
  },

  pageChange: (state, action) => {
    state.pagination = action.payload;
  },
  changeSearchKey: (state, action) => {
    state.searchKey = action.payload;
  },

  curriculumFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  curriculumReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.searchKey = undefined;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.curriculumList = [];
    state.totalData = 0;
    state.curriculumDetail = undefined;
  },
};

export const curriculumSlice = createSlice({
  name: "curriculumSlice",
  initialState,
  reducers,
});

const curriculumReducer = curriculumSlice.reducer;
export default curriculumReducer;
