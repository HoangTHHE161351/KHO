import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { teacherActions } from "src/redux-store/store";
import { TeacherService } from "src/services";

export function* getTeacherListSaga(action) {
  try {
    const response = yield call(TeacherService.getTeacherList, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(teacherActions.getTeacherListSuccess(response.data.data));
    } else {
      yield put(teacherActions.teacherFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(teacherActions.teacherFailed(error));
  }
}
// export function* getTeacherListSaga({ payload }) {
//   try {
//     const response = yield call(TeacherService.getTeacherList, payload);
//     if (response.status === ApiConstants.STT_OK) {
//       yield put(teacherActions.getTeacherListSuccess(response.data.data));
//     } else {
//       yield put(teacherActions.teacherFailure(response.data));
//     }
//   } catch (error) {
//     EnvConstants.IS_DEV && console.log(error);
//     yield put(teacherActions.teacherFailure(error));
//   }
// }

export function* getTeacherSubjectSaga(action) {
  try {
    const response = yield call(
      TeacherService.getTeacherSubjectList,
      action.payload
    );
    if (response.status === ApiConstants.STT_OK) {
      yield put(
        teacherActions.getTeacherListSuccess({
          teacherList: response.data.data.content,
          totalElements: response.data.data.totalElements,
        })
      );
    } else {
      yield put(teacherActions.teacherFailed(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(teacherActions.teacherFailed(error));
  }
}
