import { createSlice } from "@reduxjs/toolkit";

const { DataConstants } = require("src/const");

const DEFAULT_FILTER = {
  status: null,
  curriculumName: null,
  search: null,
};

const initialState = {
  isFetching: false,
  error: null,

  totalData: 0,
  students: [],
  pagination: DataConstants.PAGINATION_DEFAULT,
  filter: DEFAULT_FILTER,
};

const reducers = {
  getStudentList: (state, action) => {
    state.isFetching = true;
  },
  getStudentListSuccess: (state, action) => {
    state.isFetching = false;
    state.students = action.payload.studentList;
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

  changePage: (state, action) => {
    state.pagination = action.payload;
  },

  studentFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  studentReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.totalData = 0;
    state.students = [];
    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.filter = DEFAULT_FILTER;
  },
};

export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers,
});

const studentReducer = studentSlice.reducer;
export default studentReducer;
