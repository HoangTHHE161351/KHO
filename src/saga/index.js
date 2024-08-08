import { all, takeLatest } from "redux-saga/effects";
import {
  authActions,
  classesActions,
  curriculumActions,
  deviceActions,
  roomActions,
  scheduleActions,
  semesterActions,
  studentActions,
  subjectActions,
  teacherActions,
  timeSlotActions,
  userActions,
} from "src/redux-store/store";
import {
  getUserProfileSaga,
  requestLoginSaga,
  requestRegisterSaga,
} from "./auth.saga";
import {
  getUserBlackListSaga,
  getUserByTokenSaga,
  getUserListSaga,
} from "./user.saga";
import { getStudentListSaga } from "./student.saga";
import { getDeviceListSaga } from "./device.saga";
import { getSubjectListSaga } from "./subject.saga";
import { getScheduleListSaga, getScheduleStudentSaga } from "./schedule.saga";
import { getSemesterListSaga } from "./semester.saga";
import {
  getCurriculumDetailSaga,
  getCurriculumListSaga,
} from "./curriculum.saga";
import { getClassListSaga } from "./classes.saga";
import { getRoomListSaga } from "./room.saga";
import { getScheduleWeeksSaga, getTimeSlotsListSaga } from "./timeSlots.saga";
import { getTeacherListSaga } from "./teacher.saga";

function* rootSaga() {
  yield all([
    takeLatest(authActions.requestLogin.type, requestLoginSaga),
    takeLatest(authActions.requestRegister.type, requestRegisterSaga),
    takeLatest(authActions.getUserProfile.type, getUserProfileSaga),
    takeLatest(userActions.getUserByToken.type, getUserByTokenSaga),
    takeLatest(userActions.getUserList.type, getUserListSaga),
    takeLatest(userActions.getUserBlackList.type, getUserBlackListSaga),
    takeLatest(deviceActions.getDeviceList.type, getDeviceListSaga),
    takeLatest(studentActions.getStudentList.type, getStudentListSaga),
    takeLatest(subjectActions.getSubjectList.type, getSubjectListSaga),
    takeLatest(scheduleActions.getScheduleList.type, getScheduleListSaga),
    takeLatest(scheduleActions.getScheduleStudent.type, getScheduleStudentSaga),
    takeLatest(
      semesterActions.getSemesterListRequest.type,
      getSemesterListSaga
    ),
    takeLatest(curriculumActions.getCurriculumList.type, getCurriculumListSaga),
    takeLatest(
      curriculumActions.getCurriculumDetail.type,
      getCurriculumDetailSaga
    ),
    takeLatest(classesActions.getClassesList.type, getClassListSaga),
    takeLatest(roomActions.getRoomList.type, getRoomListSaga),
    takeLatest(timeSlotActions.getTimeSlotsList.type, getTimeSlotsListSaga),
    takeLatest(timeSlotActions.getScheduleWeeks.type, getScheduleWeeksSaga),
    takeLatest(teacherActions.getTeacherList.type, getTeacherListSaga),
  ]);
}

export default rootSaga;
