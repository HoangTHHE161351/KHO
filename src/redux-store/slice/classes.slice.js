import { createSlice } from "@reduxjs/toolkit";
const { DataConstants } = require("src/const");

const initialState = {
  isFetching: false,
  error: null,

  searchKey: undefined,
  pagination: DataConstants.PAGINATION_DEFAULT,
  classesList: [],
  totalData: 0,
  classDetail: undefined,
};

const reducers = {
  getClassesList: (state, action) => {
    state.isFetching = true;
  },
  getClassesListSuccess: (state, action) => {
    state.isFetching = false;
    state.classesList = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  pageChange: (state, action) => {
    state.pagination = action.payload;
  },
  changeSearchKey: (state, action) => {
    state.searchKey = action.payload;
  },

  classFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  classReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.searchKey = undefined;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.classesList = [];
    state.totalData = 0;
    state.classDetail = undefined;
  },
};

export const classesSlice = createSlice({
  name: "classesSlice",
  initialState,
  reducers,
});

const classesReducer = classesSlice.reducer;
export default classesReducer;
