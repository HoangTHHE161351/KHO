import { createSlice } from "@reduxjs/toolkit";
import { DataConstants } from "src/const";

const DEFAULT_FILTER = {
  status: null,
  search: null,
  month: null,
  year: null,
};

const initialState = {
  isFetching: false,
  error: null,
  totalData: 0,
  pagination: DataConstants.PAGINATION_DEFAULT,
  teacherList: [],
  filter: DEFAULT_FILTER,
  teacherProfile: {},
  teachers: [],
};

const reducers = {
  getTeacherList: (state, action) => {
    state.isFetching = true;
  },

  getTeacherListSuccess: (state, action) => {
    state.isFetching = false;
    state.teacherList = action.payload.teacherList;
    state.teachers = action.payload.content;
    state.totalData = action.payload.totalElements;
  },
  pageChange: (state, action) => {
    state.pagination.page = action.payload;
  },
  teacherFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  teacherFailed: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },

  teacherReset: (state) => {
    state.isFetching = false;
    state.error = null;
    state.userProfile = {};
    state.filter = DEFAULT_FILTER;
    state.teachers = [];
    state.pagination = DataConstants.PAGINATION_DEFAULT;
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
};

export const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState,
  reducers,
});

const teacherReducer = teacherSlice.reducer;
export default teacherReducer;
