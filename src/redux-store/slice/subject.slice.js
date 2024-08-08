import { createSlice } from "@reduxjs/toolkit";
import { DataConstants } from "src/const";

const DEFAULT_FILTER = {
  search: null,
};

const initialState = {
  isFetching: false,
  error: null,

  totalData: 0,
  pagination: DataConstants.PAGINATION_DEFAULT,
  subjectList: [],
  filter: DEFAULT_FILTER,
  subjectProfile: {},
};

const reducers = {

  startLoading: (state) => {
    state.isFetching = true;
  },
  stopLoading: (state) => {
    state.isFetching = false;
  },

  getSubjectList: (state, action) => {
    state.isFetching = true;
  },
  getSubjectListSuccess: (state, action) => {
    state.isFetching = false;
    state.subjectList = action.payload?.content || [];
    state.totalData = action.payload?.totalElements || 0;
  },

  pageChange: (state, action) => {
    state.pagination = action.payload;
  },
  changeFilterWithKey: (state, action) => {
    const objectData = action.payload;
    state.filter[objectData.key] = objectData.value;
    state.pagination.page = DataConstants.PAGINATION_DEFAULT.page;
  },

  subjectFailed: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  subjectReset: (state) => {
    state.isFetching = false;
    state.error = null;
    state.subjectProfile = {};
    state.filter = DEFAULT_FILTER;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
  },
};

export const subjectSlice = createSlice({
  name: "subjectSlice",
  initialState,
  reducers,
});

const subjectReducer = subjectSlice.reducer;
export default subjectReducer;
