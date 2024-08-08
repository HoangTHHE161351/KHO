import { call, put } from "redux-saga/effects";
import { ApiConstants, EnvConstants } from "src/const";
import { studentActions } from "src/redux-store/store";
import { StudentService } from "src/services";

export function* getStudentListSaga(action) {
  try {
    const response = yield call(StudentService.getStudentListService, action.payload);
    if (response.status === ApiConstants.STT_OK) {
      yield put(
        studentActions.getStudentListSuccess({
          studentList: response.data.data.content,
          totalElements: response.data.data.totalElements,
        })
      );
    } else {
      yield put(studentActions.studentFailure(response.data));
    }
  } catch (error) {
    EnvConstants.IS_DEV && console.log(error);
    yield put(studentActions.studentFailure(error));
  }
}
