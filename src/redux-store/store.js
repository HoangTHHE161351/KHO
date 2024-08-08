//Import để lấy reducer và action từ ./slice/....
import createSagaMiddleware from "@redux-saga/core";
import authReducer, { authSlice } from "./slice/auth.slice";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "src/saga";
import userReducer, { userSlice } from "./slice/user.slice";
import studentReducer, { studentSlice } from "./slice/student.slice";
import subjectReducer, { subjectSlice } from "./slice/subject.slice";
import deviceReducer, { deviceSlice } from "./slice/device.slice";
import scheduleReducer, { scheduleSlice } from "./slice/schedule.slice";
import semesterReducer, { semesterSlice } from "./slice/semester.slice";
import curriculumReducer, { curriculumSlice } from "./slice/curriculum.slice";
import classesReducer, { classesSlice } from "./slice/classes.slice";
import roomReducer, { roomSlice } from "./slice/room.slice";
import timeSlotsReducer, { timeSlotsSlice } from "./slice/timeslots.slice";
import teacherReducer, { teacherSlice } from "./slice/teacher.slice";
//Lấy action
export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const studentActions = studentSlice.actions;
export const deviceActions = deviceSlice.actions;
export const subjectActions = subjectSlice.actions;
export const scheduleActions = scheduleSlice.actions;
export const semesterActions = semesterSlice.actions;
export const curriculumActions = curriculumSlice.actions;
export const classesActions = classesSlice.actions;
export const roomActions = roomSlice.actions;
export const timeSlotActions = timeSlotsSlice.actions;
export const teacherActions = teacherSlice.actions;
//Lấy reducer
const reducer = {
  authReducer,
  userReducer,
  studentReducer,
  deviceReducer,
  subjectReducer,
  scheduleReducer,
  semesterReducer,
  curriculumReducer,
  classesReducer,
  roomReducer,
  timeSlotsReducer,
  teacherReducer,
};
//Tạo middleware: Đoạn mã trung gian giữa request/response
const sagaMiddleware = createSagaMiddleware();
//
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;
