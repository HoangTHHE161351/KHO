import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  isFetching: false,
  error: null,
  filter: {
    date: dayjs().toISOString(),
  },
  filterStudent: {
    year: 2024,
    from: dayjs().day(1),
    to: dayjs().day(7),
    week: null,
  },
  schedules: [],
};

const reducers = {
  getScheduleList: (state) => {
    state.isFetching = true;
  },
  getScheduleListSuccess: (state, action) => {
    state.isFetching = false;
    state.schedules = action.payload;
  },

  getScheduleStudent: (state) => {
    state.isFetching = true;
  },
  getScheduleStudentSuccess: (state, action) => {
    state.isFetching = false;
    state.schedules = action.payload;
  },

  changeFilterWithKey: (state, action) => {
    const objectData = action.payload;
    state.filter[objectData.key] = objectData.value;
  },
  changeFilterStudentWithKey: (state, action) => {
    state.filterStudent[action.payload.key] = action.payload.value;
  },
  scheduleFailed: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  scheduleReset: (state) => {
    state.isFetching = false;
    state.error = null;
    state.schedules = [];
    state.filter = {
      date: dayjs().toISOString(),
    };
  },
};

export const scheduleSlice = createSlice({
  name: "scheduleSlice",
  initialState,
  reducers,
});

const scheduleReducer = scheduleSlice.reducer;
export default scheduleReducer;
