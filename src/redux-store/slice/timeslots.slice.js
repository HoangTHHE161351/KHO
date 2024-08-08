import { createSlice } from "@reduxjs/toolkit";
import { DataConstants } from "src/const";

const initialState = {
  isFetching: false,
  error: null,

  searchKey: undefined,
  pagination: DataConstants.PAGINATION_DEFAULT,
  timeSlotsList: [],
  schoolWeeks: [],
  totalData: 0,
  timeSlotDetail: undefined,
};

const reducers = {
  getTimeSlotsList: (state, action) => {
    state.isFetching = true;
  },
  getTimeSlotsListSuccess: (state, action) => {
    state.isFetching = false;
    state.timeSlotsList = action.payload.content;
    state.totalData = action.payload.totalElements;
  },

  getScheduleWeeks: (state, action) => {
    state.isFetching = true;
  },
  getScheduleWeeksSuccess: (state, action) => {
    state.isFetching = false;
    state.schoolWeeks = action.payload;
  },

  getTimeSlotDetail: (state, action) => {
    state.isFetching = true;
  },
  getTimeSlotDetailSuccess: (state, action) => {
    state.isFetching = false;
    state.timeSlotDetail = action.payload;
  },

  pageChange: (state, action) => {
    state.pagination = action.payload;
  },
  changeSearchKey: (state, action) => {
    state.searchKey = action.payload;
  },

  timeSlotFailure: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  timeSlotReset: (state) => {
    state.isFetching = false;
    state.error = null;

    state.searchKey = undefined;
    state.pagination = DataConstants.PAGINATION_DEFAULT;
    state.timeSlotsList = [];
    state.totalData = 0;
    state.timeSlotDetail = undefined;
  },
};

export const timeSlotsSlice = createSlice({
  name: "timeSlotsSlice",
  initialState,
  reducers,
});

const timeSlotsReducer = timeSlotsSlice.reducer;
export default timeSlotsReducer;
